pipeline {
  agent {
    docker 'circleci/node:10-stretch-browsers'
  }
  stages {
    stage('Fetch dependencies') {
      steps {
        sh 'npm install'
      }
    }
    stage('E2E Test') {
      steps {
        sh 'mkdir reports'
        sh 'npm run e2e'
      }
    }
    stage('Generating reports') {
      steps  {
        sh 'cat ./reports/e2e.json | ./node_modules/.bin/cucumber-junit > ./reports/e2e.xml'
        junit 'reports/*.xml'
      }
    }
  }
  post {
    failure {
      slackSend (color: '#FF0000', channel: 'back-office', message: ":warning: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' pipeline failed for branch ${env.GIT_BRANCH} - commit ${env.GIT_COMMIT}")
    }
    cleanup {
      cleanWs()
    }
  }
}
