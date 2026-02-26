pipeline {
    agent any

    tools { nodejs 'NodeJS-18' }

    environment { ORG = 'QAOrg' }

    stages {
        stage('Checkout') { steps { checkout scm } }
        stage('Install Dependencies') { steps { sh 'npm install' } }
        stage('Run Automation Tests') { steps { sh 'npx playwright test' } }
        stage('Deploy to Dev (Simulated)') {
            when { branch 'develop' }
            steps { sh 'sf project deploy start --source-dir force-app --target-org $ORG' }
        }
        stage('Deploy to QA (Simulated)') {
            when { branch 'release' }
            steps { sh 'sf project deploy start --source-dir force-app --target-org $ORG' }
        }
        stage('Deploy to Prod (Simulated)') {
            when { branch 'main' }
            steps { sh 'sf project deploy start --source-dir force-app --target-org $ORG' }
        }
    }

    post {
        success { echo 'Pipeline Successful ✅' }
        failure { echo 'Pipeline Failed ❌' }
    }
}