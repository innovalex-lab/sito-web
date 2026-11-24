// Stampa in JSON il centro degli occhi, il riquadro del volto e il punto più basso del mento, in pixel con origine in alto a sinistra. La sommità della testa la ricava scripts/ritratti.py dalla maschera.
import Foundation
import Vision
import ImageIO
let u = URL(fileURLWithPath: CommandLine.arguments[1])
let src = CGImageSourceCreateWithURL(u as CFURL, nil)!; let cg = CGImageSourceCreateImageAtIndex(src, 0, nil)!
let W = Double(cg.width), H = Double(cg.height)
let r = VNDetectFaceLandmarksRequest(); try VNImageRequestHandler(cgImage: cg).perform([r])
let f = r.results!.first!
func centro(_ p: VNFaceLandmarkRegion2D?) -> [Double] {
  let pts = p!.pointsInImage(imageSize: CGSize(width: W, height: H))
  let x = pts.map{Double($0.x)}.reduce(0,+)/Double(pts.count); let y = pts.map{Double($0.y)}.reduce(0,+)/Double(pts.count)
  return [x, H - y]
}
let b = f.boundingBox
let mento = f.landmarks!.faceContour!.pointsInImage(imageSize: CGSize(width: W, height: H)).map{H - Double($0.y)}.max()!
let o: [String: Any] = ["w": W, "h": H, "occhioSx": centro(f.landmarks!.leftEye), "occhioDx": centro(f.landmarks!.rightEye),
  "volto": [b.minX*W, H-(b.maxY*H), b.width*W, b.height*H], "mento": mento]
print(String(data: try JSONSerialization.data(withJSONObject: o), encoding: .utf8)!)
