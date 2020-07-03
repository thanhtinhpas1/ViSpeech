import React, { useEffect } from 'react'
import { Tabs } from 'antd'
import MonacoEditor from 'react-monaco-editor'

const { TabPane } = Tabs
const jsCode =
  "const ViSpeech = require('asr-vietspeech');\n" +
  "const fs = require('fs');\n" +
  ' \n' +
  '// The name of the audio file to trascript\n' +
  "const fileName = __dirname + '\\\\files\\\\audio.wav';\n" +
  // eslint-disable-next-line no-template-curly-in-string
  'console.info(`Filename ${fileName}`);\n' +
  ' \n' +
  '// Reads a local audio file and converts it to base64\n' +
  'const file = fs.createReadStream(fileName);\n' +
  "file.setEncoding('utf8')\n" +
  ' \n' +
  "// The audio file's encoding, sample rate in hertz, timeout, maxSize, token\n" +
  'const config = {\n' +
  '    token: process.env.API_KEY, // set api key get from asr system \n' +
  "    encoding: 'LINEAR16', // set encoding\n" +
  '    sampleRateHertz: 16000, // set rate Hz\n' +
  '    timeout: 10000, // 10 seconds\n' +
  '    maxSize: 51200 // 50 Mb\n' +
  '};\n' +
  'const asrViSpeech = new ViSpeech(config);\n' +
  ' \n' +
  'asrViSpeech.call(file).then(result => {\n' +
  // eslint-disable-next-line no-template-curly-in-string
  '    console.info(`Response ${JSON.stringify(result)}`)\n' +
  '    res.status(200).send(result.text);\n' +
  '}).catch(err => {\n' +
  "    console.error('Api key invalid', err);\n" +
  '    res.status(401).send(err.message);\n' +
  '})'

const javaCode =
  'public class MavenSample {\n' +
  '    public static void main(String[] args) {\n' +
  '        File file = new File("src/main/resources/process.wav");\n' +
  '        if (file.canRead()) {\n' +
  '            String token = "replace token here";\n' +
  '            int timeout = 10000;\n' +
  '            int sampleRate = 16000;\n' +
  '            int maxSize = 51200;\n' +
  '            Configuration config = new Configuration(token, AudioEncoding.AMR, timeout, sampleRate, maxSize);\n' +
  '            SpeechToText asrSpeech = new SpeechToText(config);\n' +
  '            try {\n' +
  '                String result = asrSpeech.call(file);\n' +
  '                if (result == null) System.out.println("Invalid file.");\n' +
  '                else System.out.println("Transcription: " + result);\n' +
  '            } catch (IllegalArgumentException arEx) {\n' +
  '                System.out.println("Token invalid.");\n' +
  '            } catch (IOException ex) {\n' +
  '                System.out.println("Server connection aborted.");\n' +
  '            }\n' +
  '        } else {\n' +
  '            System.out.println("File not found.");\n' +
  '        }\n' +
  '    }\n' +
  '}'

const csharpCode =
  '    class Program\n' +
  '    {\n' +
  '        static void Main(string[] args)\n' +
  '        {\n' +
  '            String token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNjNDExOWMwLWExYzEtMTFlYS1iOTdjLTFiOTdlMzMzNTc2NCIsImlhdCI6MTU5MDc2NjYzNn0.K36Axz4FnuORA9jGr_6cs0CjV2vVAI9DZLxe5sjNb7A";\n' +
  '            Configuration config = new Configuration(token, AudioEncoding.AMR, 10000, 16000, 51200);\n' +
  '            SpeechText speech = new SpeechText(config);\n' +
  '            FileStream file = File.Create("./processing.wav");\n' +
  '            try\n' +
  '            {\n' +
  '                string result = speech.Call(file).Result;\n' +
  '                Console.WriteLine(result);\n' +
  '            } catch(AggregateException ex)\n' +
  '            {\n' +
  '                Console.WriteLine("Something went wrong" + ex.Message);\n' +
  '            }\n' +
  '        }\n' +
  '    }'
const DocumentsPage = () => {
  useEffect(() => {}, [])
  return (
    <div className="row container-fluid mt-0">
      <div className="col-md-12 pl-5 pr-5">
        <div className="card" id="profile-main">
          <div className="card-header">
            <h4 className="card-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
              Tài liệu: Hướng dẫn sử dụng thư viện SDK
            </h4>
            <hr />
            <p>
              Tài liệu này sẽ hướng dẫn gửi <b>request</b> đến Speech-To-Text API trong ngôn môt số ngôn ngữ
              <code> C#, JavaScript, Java</code> sử dụng các thư viện SDK.
            </p>
            <br />
            <p>
              Thư viện SDK Speech-To-Text giúp dễ dàng sử dụng API key nhận dạng âm thanh tiếng Việt. Bạn có thể dễ dàng
              gửi một <code>file</code> âm thanh đến Speech-To-Text API, để nhận về kết quả dịch của file này.
            </p>
            <br />
            <h4>Cài đặt thư viện SDK</h4>
            <Tabs className="ml-5 doc-tab" type="card">
              <TabPane tab="JavaScript" key="1">
                Trước khi cài đặt NPM package, hãy đảm bảo rằng bạn đã chuẩn bị đủ môi trường lập trình NodeJs.
                <br />
                <code>npm install --save asr-vietspeech</code>
              </TabPane>
              <TabPane tab="Java" key="2">
                <p>
                  Nếu bạn đang sử dụng <a href="https://maven.apache.org/">Maven</a>, thêm những thông tin sau vào{' '}
                  <b>pom.xml</b>
                  <br />
                  <code>
                    <span className="tag main-color">&lt;dependency&gt;</span>
                    <br />
                    <span className="tag ml-4">&lt;groupId&gt;</span>com.asr.vietspeech
                    <span className="tag">&lt;&#47;groupId&gt;</span>
                    <br />
                    <span className="tag ml-4">&lt;artifactId&gt;</span>asr-vietspeech
                    <span className="tag">&lt;&#47;artifactId&gt;</span>
                    <br />
                    <span className="tag ml-4">&lt;version&gt;</span>0.0.1
                    <span className="tag">&lt;&#47;version&gt;</span>
                    <br />
                    <span className="tag">&lt;&#47;dependency&gt;</span>
                  </code>
                </p>
                <br />
                <p>
                  Nếu bạn đang sử dụng <a href="https://gradle.org/">Gradle</a>, thêm những thông tin sau vào
                  depedencies.
                  <br />
                  <code>&apos;com.vietspeech:asr-vietspeech:0.0.1&apos;</code>
                </p>
                <br />
                <p>
                  Nếu bạn đang sử dụng <a href="https://www.scala-sbt.org/">sbt</a>, thêm những thông tin sau vào
                  depedencies.
                  <br />
                  <code>
                    libraryDependencies += &quot;com.asr.vietspeech&quot; % &quot;asr-vietspeech&quot; %
                    &quot;0.0.1&quot;
                  </code>
                </p>
              </TabPane>
              <TabPane tab="C#" key="3">
                <code>Install-Package asr-vietspeech -Version 1.0.0</code>
              </TabPane>
            </Tabs>
            <br />
            <h4>Sử dụng API</h4>
            <p>
              Bây giờ chúng ta có thể sử dụng <b>Speech-To-Text API</b> để dịch một tập tin âm thanh thành văn bản. Sử
              dụng dựa theo những mã nguồn mẫu sau đây để gửi request.
            </p>
            <Tabs className="ml-5 doc-tab" type="card">
              <TabPane tab="JavaScript" key="1">
                <div style={{ textAlign: 'left' }}>
                  <a target="blank" className="button" href="https://github.com/trankhanhlinh/vispeech-asr">
                    Xem GitHub
                  </a>
                  <MonacoEditor width="60%" height="350" language="javascript" theme="vs-dark" value={jsCode} />
                </div>
              </TabPane>
              <TabPane tab="Java" key="2">
                <div style={{ textAlign: 'left' }}>
                  <a target="blank" className="button" href="https://github.com/thanhtinhpas1/asr-sdk-java">
                    Xem GitHub
                  </a>
                  <MonacoEditor width="60%" height="350" language="java" theme="vs-dark" value={javaCode} />
                </div>
              </TabPane>
              <TabPane tab="C#" key="3">
                <div style={{ textAlign: 'left' }}>
                  <a target="blank" className="button" href="https://github.com/thanhtinhpas1/asr-sdk-csharp">
                    Xem GitHub
                  </a>
                  <MonacoEditor width="60%" height="350" language="csharp" theme="vs-dark" value={csharpCode} />
                </div>
              </TabPane>
            </Tabs>
            <br />
            <p>
              Như vậy là bạn đã gửi thành công request đến Speech-To-Text API. Nếu bạn nhận được bất kỳ lỗi nào thì có
              thể do tập tin âm thanh chưa được đính kèm, hoặc api key không hợp lệ.
            </p>
            <br />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DocumentsPage
