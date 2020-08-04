import java.text.SimpleDateFormat

pipeline {
  environment {
    registry = "technosoftdemo/admin"
    registryCredential = 'TSDemoDockerhub'
    dockerImage = ''
    versionNumber = "V1.0.0.${currentBuild.number}"
	// JOB Metrics parameter
    JobName = "${JOB_NAME}"
    BuildNumber = "V1.0.0.${currentBuild.number}"
    commitId = ''
    SQTaskId = ''
    SQTaskUrl=''
    SQScanDate=''
    branchName=''
    jobStartedAt = ''
    diff_files =''
    userName=''
    userEmailId=''
    checkInComment=''
  }
  agent any
  tools {nodejs "node"}

  stages {
    stage('Cloning Git') {
      steps {
	    script {
          jobStartedAt = new Date()
          }
          git branch: 'dev', credentialsId: 'Technosoft-git', url: 'https://github.com/technosoftdemo/admin.git'
      }
    }
     stage('Install Packages') {
      steps {
          script {
               def causes = currentBuild.getBuildCauses()
                echo "Build cause :${causes}"
          }
        echo "current build number: "+versionNumber+"${currentBuild.number}"
        echo "previous build number: ${currentBuild.previousBuild.getNumber()}"
       // sh "npm install"
       // sh "npm run postinstall"
      }
    }
    stage('Build Binaries') {
      steps {
	    script{
	  commitId = sh(returnStdout: true, script: 'git rev-parse HEAD').trim()
               branchName = sh(returnStdout: true, script: 'git rev-parse --abbrev-ref HEAD').trim()
               // git log --format='%an <%ae>' GIT_COMMIT_ID
               userName = sh(returnStdout: true, script: 'git log -1 --pretty=format:\'%an\'').trim()
               userEmailId = sh(returnStdout: true, script: 'git log -1 --pretty=format:\'%ae\'').trim()
               checkInComment = sh(returnStdout: true, script: 'git log --format=format:%s -1 ${commitId}').trim()
	           //def diff_files = sh(returnStdout: true, script: 'git show --name-only '+ commitId)
	           diff_files = getChangedFilesList()
               echo "${userName}"
               echo "${userEmailId}"
               echo "${branchName}"
               echo "changed files list"
	           echo "${diff_files}"
	           echo "changed files list end"

             //sh "npm run build:ssr"
      }
	  }
    }
    stage('Code Quality') {
        parallel{
			stage('Unit Tests') {
			  steps {
				sh "export CHROME_BIN=/usr/bin/chromium;npm run cibuild"
			  }
			}
            stage('Static Code Analysis') {
				environment {
					scannerHome = tool 'SonarQubeScanner'
				}
			   steps {
				withSonarQubeEnv('sonarqube') {
					    //sh "sonar.projectversion=V1.0.0.1 >> sonar-project.properties"
					    // sh "${scannerHome}/bin/sonar-scanner"
					script{
							sh "${scannerHome}/bin/sonar-scanner"
							sh "cat .scannerwork/report-task.txt"
							def props = readProperties  file: '.scannerwork/report-task.txt'
							echo "properties=${props}"
							def sonarServerUrl=props['serverUrl']
							SQTaskUrl= props['ceTaskUrl']
							SQTaskId = props['ceTaskId']
							echo "Code quality Task Id : ${SQTaskId}"
						}
					}
				/*   timeout(time: 10, unit: 'MINUTES') {
					   waitForQualityGate abortPipeline: true
				   }*/
				}
			}
        }
    }
    stage('Build Container') {
      steps{
        script {
          dockerImage = docker.build(registry + ":"+versionNumber, "--build-arg CACHEBUST=${currentBuild.startTimeInMillis} .")
        }
      }
    }
    stage('Register Container') {
      steps{
        script {
          docker.withRegistry( '', registryCredential ) {
            dockerImage.push()
          }
        }
      }
    }
    stage('Deploy In Development') {
      steps{
	  script {
        //sh "docker stop fireball"
         sh "sudo docker rm -f admin || true"
        sh "sudo docker run --name admin -d -p 9090:80 "+registry+":"+versionNumber
		}
      }
    }
  }
  // Post declaration steps
post {
        success {
            script {
                        def jobEndedAt= new Date()
                        def sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
                        jobStartedAt = sdf.format(jobStartedAt)
                        jobEndedAt = sdf.format(jobEndedAt)
                        echo "${jobStartedAt}"
                        echo "${jobEndedAt}"
                        echo 'saved the state to DB'
                        echo "JobName: "+JobName
                        echo "BuildNumber: "+BuildNumber
                        echo "commitId: "+commitId
                        echo "SQTaskId: "+SQTaskId
                        echo "SQTaskUrl: "+ SQTaskUrl
                        def buildInfo = """
                        {"jobName": "$JobName",
                        "buildNumber": "$BuildNumber",
                        "commitId": "$commitId",
                        "cqTaskId": "$SQTaskId",
                        "cqStatusUrl": "$SQTaskUrl",
                        "jobStartedAt": "$jobStartedAt",
                        "jobEndedAt": "$jobEndedAt",
                        "jobStatus" : "COMPLETED",
                        "userName" : "$userName",
                        "branchName":"$branchName",
                        "checkInComments": "$checkInComment",
                        "userEmailId" : "$userEmailId",
                        "changedFiles" : "$diff_files"}
                            """
                        echo buildInfo
                       // sleep(time:180,unit:"SECONDS")
                        def response = httpRequest acceptType: 'APPLICATION_JSON', contentType: 'APPLICATION_JSON', httpMode: 'POST', requestBody: buildInfo, url: "http://13.234.5.9:8086/v1/code-metrics"
                        // echo response
                        echo "Execution completed"
            }
        }
        failure {
             script {
                             def jobEndedAt= new Date()
                             def sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
                             jobStartedAt = sdf.format(jobStartedAt)
                             jobEndedAt = sdf.format(jobEndedAt)
                             echo "${jobStartedAt}"
                             echo "${jobEndedAt}"
                             echo 'saved the state to DB'
                             echo "JobName: "+JobName
                             echo "BuildNumber: "+BuildNumber
                             echo "commitId: "+commitId
                             echo "SQTaskId: "+SQTaskId
                             echo "SQTaskUrl: "+ SQTaskUrl
                             def buildInfo = """
                             {"jobName": "$JobName",
                             "buildNumber": "$BuildNumber",
                             "commitId": "$commitId",
                             "cqTaskId": "$SQTaskId",
                             "cqStatusUrl": "$SQTaskUrl",
                             "jobStartedAt": "$jobStartedAt",
                             "jobEndedAt": "$jobEndedAt",
                             "jobStatus" : "FAILED",
                             "userName" : "$userName",
                             "branchName":"$branchName",
                             "checkInComments": "$checkInComment",
                             "userEmailId" : "$userEmailId",
                             "changedFiles" : "$diff_files"}
                                 """
                             echo buildInfo
                            // sleep(time:180,unit:"SECONDS")
                             def response = httpRequest acceptType: 'APPLICATION_JSON', contentType: 'APPLICATION_JSON', httpMode: 'POST', requestBody: buildInfo, url: "http://13.234.5.9:8086/v1/code-metrics"
                             // echo response
                             echo "Execution completed"
                 }
         }
    }
}


// returns a list of changed files
@NonCPS
String getChangedFilesList() {

    changedFiles = []
    for (changeLogSet in currentBuild.changeSets) {
        for (entry in changeLogSet.getItems()) { // for each commit in the detected changes
            for (file in entry.getAffectedFiles()) {
                if(!file.getPath().startsWith('out/production/classes')) {
                 //fileName = file.getPath() + "(" + file.getEditType().getName() +")"
                 fileName = file.getPath() + "|" + file.getEditType().getName()
                 // fileName = file.getPath()
                changedFiles.add(fileName)
                }
            }
        }
    }
    if(changedFiles == []){
        return ''
    }
    else{
        return changedFiles
    }
}
