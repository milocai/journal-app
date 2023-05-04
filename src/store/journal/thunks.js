import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, updateNote, setActiveNote, savingNewNote, setNotes, setSaving, setPhotosToActiveNote, deleteNoteById } from "./";
import { loadNotes } from "../../helpers/loadNotes";
import { fileUpload } from "../../helpers/fileUpload";

export const startNewNote = () => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;
        dispatch( savingNewNote() )

        // para grabar en firebase usamos el uid del user

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes` )  );
        await setDoc( newDoc, newNote )

        newNote.id = newDoc.id

        
        dispatch( addNewEmptyNote( newNote ) )
        dispatch( setActiveNote ( newNote ) )
    }
}

export const startLoadingNotes = ( uid ) => {
    return async( dispatch, getState ) => {
        const { uid } = getState().auth;
        if( !uid ) throw new Error('El UID del usuario no existe')

        const notes = await loadNotes( uid )

        dispatch( setNotes(notes) )
    }
}

export const startSaveNote = (  ) => {
    return async( dispatch, getState ) => {
        
        dispatch( setSaving() )
        
        const { uid } = getState().auth;
        const { active: activeNote } = getState().journal;

        const noteToSave = { ...activeNote }
        delete noteToSave.id

        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ activeNote.id }` )
        await setDoc( docRef, noteToSave, { merge: true } )

        dispatch( updateNote( activeNote ))
    }
}

export const startUploadingFiles = ( files = [] ) => {
    return async( dispatch ) => {
        dispatch( setSaving() )
        
        const fileUploadPromises = []
        for (const file of files) {
            fileUploadPromises.push( fileUpload( file ) )          
        }

        const photosUrls = await Promise.all( fileUploadPromises )

        dispatch(setPhotosToActiveNote( photosUrls ))
    }
}

export const startDeletingNote = () => {
    return async( dispatch, getState ) => {
        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }` )
        await deleteDoc( docRef )

        dispatch( deleteNoteById( note.id ) )
    }
}