pipeline {
    agent any

    triggers {
        // 🕐 Runs once per day at 1:00 PM (server time)
        cron('0 13 * * *')
    }

    environment {
        REPORT_DIR = 'playwright-report'
    }

    stages {
        stage('Install Dependencies') {
            steps {
                echo '📦 Installing dependencies...'
                bat '''
                    npm ci
                    npx playwright install
                '''
            }
        }

        stage('Clean .only from Tests') {
            steps {
                echo '🧹 Removing any .only from test files to prevent CI skips...'
                bat '''
                    powershell -Command "(Get-ChildItem -Recurse -Include *.spec.ts,*.spec.js) | ForEach-Object {
                        (Get-Content $_.FullName) -replace '\\.only\\(', '(' | Set-Content $_.FullName
                    }"
                '''
            }
        }

        stage('Run Playwright Tests') {
            steps {
                echo '🎭 Running Playwright tests with HTML + JSON reporters...'
                bat """
                    npx playwright test --reporter=list,json,html --output=${REPORT_DIR}
                """
            }
        }

        stage('Publish HTML Report') {
            steps {
                echo '📊 Publishing Playwright HTML report...'
                publishHTML([
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: "${REPORT_DIR}",
                    reportFiles: 'index.html',
                    reportName: 'Playwright Test Report'
                ])
            }
        }
    }

    post {
        always {
            echo '📧 Sending Playwright report email...'
            emailext(
                subject: "Playwright Test Report - ${currentBuild.currentResult} | Build #${env.BUILD_NUMBER} | ${env.JOB_NAME}",
                body: """
                <html>
                    <body style="font-family: Arial, sans-serif; color: #333;">
                        <h2 style="color:#0078d7;">Playwright Test Execution Report</h2>
                        <p>Hi Team,</p>
                        <p>The Playwright test execution has completed. View the detailed HTML report here:</p>
                        <p>
                            🔗 <a href="${env.BUILD_URL}Playwright_20Test_20Report"
                            style="color:#0078d7; text-decoration:none;">View Full HTML Report in Jenkins</a>
                        </p>
                        <p>Thanks,<br><b>Jenkins CI</b></p>
                    </body>
                </html>
                """,
                mimeType: 'text/html',
                to: 'sharanrajat05@gmail.com',
                attachLog: true
            )
        }

        failure {
            echo 'Build failed! Check Playwright test logs.'
        }

        success {
            echo 'Build succeeded!'
        }
    }
}
