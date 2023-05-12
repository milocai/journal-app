import { fileUpload } from '../../src/helpers/fileUpload';
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: 'dojvcbfbr',
    api_key: '965719344277964',
    api_secret: 'rojsCbnflPS665CmtbxQC4MUCbQ',
    secure: true
});

describe('pruebas en fileUpload', () => {

    test('debe de subir el archivo correctamente a cloudinary', async() => {
        const imageUrl = 'https://pbs.twimg.com/media/FveDYPSXwAElBZi?format=jpg&name=large'
        
        const resp = await fetch(imageUrl)
        const blob = await resp.blob()
        const file = new File([blob], 'foto.png')
        
        const url = await fileUpload(file)
        expect(typeof url).toBe('string')

        const segments = url.split('/')
        const imageId = segments[segments.length - 1].replace('.jpg', '')

        await cloudinary.api.delete_resources( ['journal/' + imageId], {
            resource_type: 'image'
        })
    })

})