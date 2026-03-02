import SwiftUI

struct ContentView: View {
    @State private var viewModel = ContentViewModel()

    var body: some View {
        NavigationStack {
            VStack(spacing: 16) {
                Text(viewModel.title)
                    .font(.largeTitle)
                    .bold()
                    .accessibilityAddTraits(.isHeader)
                Text("Edit ContentView.swift to get started")
                    .foregroundStyle(.secondary)
            }
            .padding()
            .navigationTitle("Starter")
        }
    }
}

#Preview {
    ContentView()
}
