export default function NoteTypeButton(props) {
    const { iconName, isSelected, onClick } = props;

    return (
        <div className={`note-type-button material-symbols-outlined ${isSelected && "note-type-selected"}`} onClick={onClick}>
            <span className="note-type-button-icon">{iconName}</span>
        </div>
    )
}

NoteTypeButton.defaultProps = {
    iconName: "",
    isSelected: false,
    onClick: null
}
