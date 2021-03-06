class Note {
  static CloneNote(note)
  {
    let noteCp = new Note(note.title, note.description,note.style)
    noteCp.pinned = note.pinned
    noteCp.created = note.created
    noteCp.reminder = note.reminder
    return noteCp
  }


    constructor(title = 'Title', description = 'Description', style = {position: {x:0, y:0}, color: [200, 200, 200], zIndex: 0, width: 256, height: 200}) {
      this.title = title
      this.description = description
      this.created = new Date().toISOString()
      this.reminder = null
      this.pinned = false
      this.style = style
    }
}