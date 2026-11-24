// Ricava la maschera del soggetto con Vision (VNGenerateForegroundInstanceMaskRequest) e la salva in PNG in scala di grigi.
import Foundation
import Vision
import CoreImage
import ImageIO
import UniformTypeIdentifiers

let args = CommandLine.arguments
let input = URL(fileURLWithPath: args[1]); let output = URL(fileURLWithPath: args[2])
guard let src = CGImageSourceCreateWithURL(input as CFURL, nil), let cg = CGImageSourceCreateImageAtIndex(src, 0, nil) else { fatalError("lettura") }
let req = VNGenerateForegroundInstanceMaskRequest()
let handler = VNImageRequestHandler(cgImage: cg, options: [:])
try handler.perform([req])
guard let obs = req.results?.first else { fatalError("nessun soggetto") }
let buf = try obs.generateScaledMaskForImage(forInstances: obs.allInstances, from: handler)
let ci = CIImage(cvPixelBuffer: buf)
let ctx = CIContext()
guard let out = ctx.createCGImage(ci, from: ci.extent, format: .L8, colorSpace: CGColorSpaceCreateDeviceGray()) else { fatalError("render") }
let dest = CGImageDestinationCreateWithURL(output as CFURL, UTType.png.identifier as CFString, 1, nil)!
CGImageDestinationAddImage(dest, out, nil); CGImageDestinationFinalize(dest)
print("ok", out.width, out.height)
