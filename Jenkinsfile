#!/usr/bin/env groovy
pipeline {
    agent any
    tools { nodejs "NodeJs-14.10.1" }

    environment {
        applicationName = "pronostics-front"
        environment = "PROD"
        sshCredentials = "aina@192.168.1.105"
        fileToBePackage = "build"
        emailToBeNotify = "mplurv@gmail.com"
    }

    stages {
        stage('Build application') {
            steps {
                buildApplication()
            }
        }
        stage('Package in archive') {
            steps {
                packageApplication(applicationName, environment, fileToBePackage)
            }
        }

        stage('Deploy Archive on remote') {
            steps {
                deployNodeJsArchiveToRemote(sshCredentials, applicationName, environment)
            }
        }

        stage('Restart application') {
            steps {
                unpackAndRestartOnRemote(sshCredentials, applicationName, environment)
            }
        }
    }

    post {
        // Send email if build failed
        failure {
            sendFailureNotification(emailToBeNotify)
        }
    }
}

//Functions used to build and deploy a NodeJs application
//Build the application
def buildApplication() {
    try {
        sh 'npm install'
    } catch (Exception err) {
        error('[BUILD APPLICATION] : ' + err.getMessage())
    }
}

//Create and archive of the application
def packageApplication(applicationName, environment, fileToBePackage) {
  try {
    // Package the application in a tar gz
    sh 'tar czf /tmp/' + applicationName + '-' + environment + '.tgz -C `pwd` ' + fileToBePackage
  } catch (Exception err) {
    error('[PACKAGE APPLICATION] : ' + err.getMessage())
  }
}

// Function dedicated to deploy a NodeJs application Archive to a remote server
def deployNodeJsArchiveToRemote(sshCredentials, applicationName, environment) {
  try {
    // Copy the current folder to the remote server
    sshagent(['aina']) {
      sh 'scp -o StrictHostKeyChecking=no /tmp/' + applicationName + '-' + environment + '.tgz ' + sshCredentials + ':/tmp'
    }
  } catch (Exception err) {
    error('[DEPLOY ARCHIVE ON REMOTE] : ' + err.getMessage())
  }
}

//Unpack the newly copied archive and restart the application
def unpackAndRestartOnRemote(sshCredentials, applicationName, environment) {
    sshagent(['aina']) {
        try {
            // Remove existing code
            sh 'ssh -o StrictHostKeyChecking=no ' + sshCredentials + ' rm -rf /var/www/html/pronostics/' + applicationName + '/*'
        } catch (Exception err) {
            echo 'No files to overprint'
        }
        try {
            // Extract new code
            sh 'ssh -o StrictHostKeyChecking=no ' + sshCredentials + ' tar -xzf /tmp/' + applicationName + '-' + environment + '.tgz -C /var/www/html/pronostics/' + applicationName + '/'
            // Remove the copied archive
            sh 'ssh -o StrictHostKeyChecking=no ' + sshCredentials + ' rm /tmp/' + applicationName + '-' + environment + '.tgz'
        } catch (Exception err) {
            error('[DEPLOY ON REMOTE] : ' + err.getMessage())
        }
    }
}

def sendFailureNotification(emailToNotify) {
  try {
    mail subject: "\u26A0 ${env.JOB_NAME} ${env.BUILD_NUMBER} build has failed",
      bcc: "", body: "Build ${env.JOB_NAME} ${env.BUILD_NUMBER} has failed. \nClick here to access to the build console \u2192 ${env.BUILD_URL + "console"} \n\nPlease look as soon as possible",
      cc: '',
      from: 'jenkins@since88.com',
      replyTo: '',
      to: emailToNotify
  } catch (Exception err) {
    error('[SEND FAILURE NOTIFICATION] : ' + err.getMessage())
  }
}
