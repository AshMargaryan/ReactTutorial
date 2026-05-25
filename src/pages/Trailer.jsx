import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { getMovieVideos } from "../services/api.js"
import "../css/Trailer.css"

function Trailer() {
    const { id } = useParams()
    const [video, setVideo] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const loadVideo = async () => {
            setLoading(true)
            setError(null)
            try {
                const videos = await getMovieVideos(id)
                const trailer = videos.find(
                    (item) => item.type === "Trailer" && item.site === "YouTube"
                ) || videos[0]
                setVideo(trailer ?? null)
            } catch (err) {
                console.error(err)
                setError("Could not load trailer.")
            } finally {
                setLoading(false)
            }
        }

        loadVideo()
    }, [id])

    if (loading) return <div className="loading">Loading trailer...</div>
    if (error) return <div className="error">{error}</div>
    if (!video) return <div className="error">No trailer found for this movie.</div>

    return (
        <div className="trailer-page">
            <div className="trailer-container">
                <h2 className="trailer-title">Movie Trailer</h2>
                <div className="trailer-video-wrapper">
                    <iframe
                        title="Movie Trailer"
                        src={`https://www.youtube.com/embed/${video.key}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
                <Link to="/" className="back-button">Back to home</Link>
            </div>
        </div>
    )
}

export default Trailer
