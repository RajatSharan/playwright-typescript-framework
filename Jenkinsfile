pipeline {
    agent any

    triggers {
        // Updated to run precisely at 1:00 PM every day (0 minutes past the 13th hour).
        cron('0 13 * * *') 
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
                // Added --output flag to explicitly ensure the report lands in the correct directory.
                // This command generates HTML in playwright-report and a results.json file.
                bat 'npx playwright test --reporter=html,json=results.json --output=${REPORT_DIR}'
            }
        }

        stage('Publish Report') {
            steps {
                echo 'Publishing HTML report...'
                // The mandatory 'allowMissing: false' parameter is required for compilation.
                publishHTML([
                    allowMissing: false, // MANDATORY FIX: Fails the step if the directory is missing
                    reportDir: "${REPORT_DIR}",
                    reportFiles: 'index.html',
                    reportName: 'Playwright Test Report',
                    alwaysLinkToLastBuild: true,
                    keepAll: true
                ])
            }
        }
    }

    post {
        always {
            script {
                echo 'Sending test report email...'
            }

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
            echo 'Build failed!'
        }

        success {
            echo 'Build succeeded!'
        }
    }
}