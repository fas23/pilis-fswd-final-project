import instance from './axios'

const IMAGES_URL = '/api/v1/images'

export const uploadImage = async (file, progressFn) => {
  const token = JSON.parse(window.localStorage.getItem('token'))

  return await instance.post(IMAGES_URL, file, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    onUploadProgress: progressFn
  })
}
