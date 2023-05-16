export const Popup = ({ onClose, children }: any) => {

    return (
        <div
            style={{ 'width': '100%', 'height': '100%', 'backgroundColor': 'rgba(0, 0, 0, 0.5)', 'display': 'flex', 'alignItems': 'center', 'justifyContent': 'center', }
            }>
            <div style={{ 'backgroundColor': '#fff', 'padding': '20px', 'borderRadius': '4px', }}>
                <button style={{ 'position': "absolute", 'top': '10px', 'right': '10px', 'backgroundColor': 'transparent', 'border': 'none', 'cursor': 'pointer', }} onClick={onClose}>
                    Close
                </button>
                {children}
            </div>
        </div>
    )
}