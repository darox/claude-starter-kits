import Testing
@testable import StarterApp

@MainActor
@Suite("ContentViewModel")
struct ContentViewModelTests {
    @Test("Initial title is set")
    func initialTitle() {
        let viewModel = ContentViewModel()
        #expect(viewModel.title == "Starter App")
    }
}
