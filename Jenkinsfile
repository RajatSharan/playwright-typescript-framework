pipeline {
    agent any

    triggers {
        // Runs every day at 1:00 PM (server time)
        cron('15 13 * * *')
    }

    environment {
        REPORT_DIR = 'playwright-report'
    }

    stages {
        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                bat '''
                    npm ci
                    npx playwright install
                '''
            }
        }

        stage('Run Playwright Tests') {
            steps {
                echo 'Running Playwright API tests...'
                // Use %REPORT_DIR% for Windows shell variable reference
                bat '''
                    npx playwright test --reporter=html,json=results.json --output=playwright-report
                '''
            }
        }

        stage('Publish HTML Report') {
            steps {
                echo 'Publishing HTML report...'
                publishHTML([
                    allowMissing: false,               // Prevents build from passing if report is missing
                    alwaysLinkToLastBuild: true,       // Keeps latest report linked in Jenkins
                    keepAll: true,                     // Retains reports for all builds
                    reportDir: 'playwright-report',    // Folder where HTML report is generated
                    reportFiles: 'index.html',         // Entry file for the report
                    reportName: 'Playwright Test Report'
                ])
            }
        }
    }

    post {
        always {
            echo 'Sending test report email...'

            emailext(
                subject: "Playwright Test Report - ${currentBuild.currentResult} | Build #${env.BUILD_NUMBER} | ${env.JOB_NAME}",
                body: """
                    <html>
                        <body style="font-family: Arial, sans-serif; color: #333;">
                            <h2 style="color: #0078d7;">Playwright Test Execution Report</h2>
                            <p>Hi Team,</p>
                            <p>The Playwright test execution has been completed. Please find the report attached and/or view it in Jenkins:</p>
                            <p>
                                📊 <a href="${env.BUILD_URL}Playwright_20Test_20Report"
                                style="color: #0078d7; text-decoration: none;">View Full HTML Report in Jenkins</a>
                            </p>
                            <p>Thanks,<br><b>Jenkins CI</b></p>
                        </body>
                    </html>
                """,
                mimeType: 'text/html',
                to: 'sharanrajat05@gmail.com',
                attachLog: true,
                attachmentsPattern: 'playwright-report/index.html'
            )
        }

        failure {
            echo '❌ Build failed! Please check the logs.'
        }

        success {
            echo '✅ Build succeeded!'
        }
    }
}
