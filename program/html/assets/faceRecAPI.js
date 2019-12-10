// <script src="face-api.js"></script>
// https://github.com/justadudewhohacks/face-api.js

const MODEL_URL = '/models'

await faceapi.loadSsdMobilenetv1Model(MODEL_URL)
await faceapi.loadFaceLandmarkModel(MODEL_URL)
await faceapi.loadFaceRecognitionModel(MODEL_URL)

const input = document.getElementById('myImage')
let fullFaceDescriptions = await faceapi.detectAllFaces(input).withFaceLandmarks().withFaceDescriptors()

fullFaceDescriptions = faceapi.resizeResults(fullFaceDescriptions)
faceapi.draw.drawDetections(canvas, fullFaceDescriptions)
faceapi.draw.drawLandmarks(canvas, fullFaceDescriptions)

const labels = ['sheldon' 'raj', 'leonard', 'howard']

const labeledFaceDescriptors = await Promise.all(
  labels.map(async label => {
    // fetch image data from urls and convert blob to HTMLImage element
    const imgUrl = `${label}.png`
    const img = await faceapi.fetchImage(imgUrl)

    // detect the face with the highest score in the image and compute it's landmarks and face descriptor
    const fullFaceDescription = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()

    if (!fullFaceDescription) {
      throw new Error(`no faces detected for ${label}`)
    }

    const faceDescriptors = [fullFaceDescription.descriptor]
    return new faceapi.LabeledFaceDescriptors(label, faceDescriptors)
  })
)

// 0.6 is a good distance threshold value to judge
// whether the descriptors match or not
const maxDescriptorDistance = 0.6
const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, maxDescriptorDistance)

const results = fullFaceDescriptions.map(fd => faceMatcher.findBestMatch(fd.descriptor))

results.forEach((bestMatch, i) => {
  const box = fullFaceDescriptions[i].detection.box
  const text = bestMatch.toString()
  const drawBox = new faceapi.draw.DrawBox(box, { label: text })
  drawBox.draw(canvas)
})
