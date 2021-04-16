
export default function Loading() {
    return (
        <div
            style={{ margin: "3rem 0", transform: "translateX(50%)" }}
            className="d-flex">
            <span
                className="spinner-border"
                style={{ width: "4rem", marginRight: '4px', height: "4rem", fontWeight: "bolder", color: 'blueviolet' }} role="status">
            </span>
        </div>
    )
}
