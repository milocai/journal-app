import { Typography } from "@mui/material"
import { JournalLayout } from "../layout/JournalLayout"
import { NoteView, NothingSelectedView } from "../views"



export const JournalPage = () => {
  return (
    <JournalLayout>

      {/* <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati facilis optio, quos vitae, nisi cumque, iusto vero quisquam quas eaque exercitationem autem praesentium iste tempore laboriosam quasi! Obcaecati, dolores enim.</Typography> */}
      
      {/* Nothing selected */}
      {/* <NothingSelectedView/> */}
      
      <NoteView/>
    </JournalLayout>
  )
}
