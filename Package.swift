// swift-tools-version: 6.2
import PackageDescription

let package = Package(
    name: "StarterApp",
    platforms: [.iOS(.v26)],
    dependencies: [
        // Add SPM packages here
        // .package(url: "https://github.com/...", from: "1.0.0")
    ],
    targets: [
        .target(
            name: "StarterApp",
            dependencies: [],
            path: "StarterApp/Sources"
        ),
        .testTarget(
            name: "StarterAppTests",
            dependencies: ["StarterApp"],
            path: "StarterApp/Tests"
        )
    ]
)
