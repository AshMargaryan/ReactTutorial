import MovieCard from "../components/MovieCard"
import {useState, useEffect, useRef } from "react"
import { searchMovies, getPopularMovies } from "../services/api.js"
import "../css/Home.css"

function Home() {
    const [searchQuery, setSearchQuery] = useState("")
    const [movies, setMovies] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const bottomRef = useRef(null)

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies(page)
                setMovies((prevMovies) =>
                    page === 1 ? popularMovies : [...prevMovies, ...popularMovies]
                )
                setHasMore(popularMovies.length > 0)
            } catch (err) {
                setError("Failed to load popular movies.")
                console.log(err)
            } finally {
                setLoading(false)
            }
        }

        loadPopularMovies()
    }, [page])

    useEffect(() => {
        const target = bottomRef.current
        if (!target) return

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !loading && !searchQuery.trim() && hasMore) {
                        setLoading(true)
                        setPage((prevPage) => prevPage + 1)
                    }
                })
            },
            { threshold: 0.1 }
        )

        observer.observe(target)

        return () => {
            observer.disconnect()
        }
    }, [loading, searchQuery, hasMore])

    

    const handleSearch = async (e) => {
        e.preventDefault()
        if (!searchQuery.trim()) return
        if (loading) return

        setLoading(true)
        try {
            const searchResults = await searchMovies(searchQuery)
            setMovies(searchResults)
            setError(null)
        }catch(err) {
            setError("Failed to search movies.")
            console.log(err)
        } finally {
            setLoading(false)
        }
        
    }

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input 
                    type="text" 
                    placeholder="Search for a movie..." 
                    className="search-input" 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                />
                <button type="submit" className="search-button">Search</button>
            </form>

            {error && <div className="error">{error}</div>}

            {loading && movies.length === 0 ? (
                <div className="loading">Loading...</div>
            ) : (
                <>
                    <div className="movies-grid">
                        {movies.map(
                            (movie) => 
                                movie.title.toLowerCase().includes(searchQuery.toLowerCase() ) &&  (
                            <MovieCard key={movie.id} movie={movie} />
                            )
                        )}
                    </div>
                    <div ref={bottomRef} style={{ height: "20px" }}></div>
                    {loading && movies.length > 0 && (
                        <div className="loading">Loading more movies...</div>
                    )}
                </>
            )}
        </div>
    );
}

export default Home