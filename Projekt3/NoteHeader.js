class NoteHeader{
    constructor(parent)
    {
        this.noteDiv = parent
        this.parent = this.noteDiv.noteContainer
    }

    onDoubleClick()
    {

    }

    createDivHeader()
    {
        this.div = document.createElement("DIV")
        this.div.classList.add("noteHeader")
        this.div.classList.add("insideNote")
        this.div.addEventListener("mousedown",(e)=>{this.dragStart(e)})
        return this.div
    }

    update(value)
    {
        this.div.innerHTML = value
    }

    dragStart(e)
    {
        if(Board.dragging == null){
            Board.dragging = this
            Board.moveTop(this.parent)
            this.draggingStart = {x: e.layerX, y: e.layerY}            
        }
    }

    dragMove(x, y)
    {
        if(Board.dragging == this)
        {
            this.noteDiv.note.position.x = x-this.draggingStart.x
            this.noteDiv.note.position.y = y-this.draggingStart.y
            this.noteDiv.updatePosition()
        }
    }

    dragEnd(board)
    {
        board.saveNotes()
        NoteFold.dragging = null            

    }
}