import org.jetbrains.compose.desktop.application.dsl.TargetFormat

plugins {
    alias(libs.plugins.kotlinMultiplatform)
}

kotlin {

    wasmWasi {
        nodejs()
        binaries.library()
    }
    sourceSets {
        commonMain.dependencies { }
    }
}