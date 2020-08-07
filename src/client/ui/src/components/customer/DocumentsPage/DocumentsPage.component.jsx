import { AimOutlined, LaptopOutlined, PayCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, Table } from 'antd';
import React, { useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import './DocumentsPage.style.scss';


const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const DocumentsPage = () => {
  const [content, setContent] = useState()
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
    '            String token = "replace token here";\n' +
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
  const commandLineText =
    '    {\n' +
    '       config: {\n' +
    '           encoding: "FLAC,\n' +
    '           sampleRateHertz: 16000\n' +
    '           languageCode: vi,\n' +
    '       }\n' +
    '       audio: {\n' +
    '          voice: $FILE_AUDIO\n' +
    '       }\n' +
    '    }\n'

  const monacoOptions = {
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: true,
    cursorStyle: 'line',
    automaticLayout: false,
  }
  const restfultAPI = <>
    <Header className="site-layout-background h2" style={{ padding: 0, margin: 0, fontSize: '18px', fontWeight: 'bold' }} >
      Restful API - Speech To Text
    </Header>
    <Content
      className="site-layout-background"
      style={{
        margin: 0,
        minHeight: 350,
      }}
    >
      <p>REST api được dùng để nhận dạng 1 file hoàn chỉnh và nhận về kết quả nhận dạng cuối cùng.</p>
      <p>Hiện tại API hỗ trợ 3 định dạng file audio: wav, mp3, PCM (phải gửi kèm thông tin audio trong request), sử dụng giao thức http POST với các thông tin như sau:</p>
      <ul style={{ listStyleType: 'circle' }}>
        <li>
          <h4>API URL: </h4><a href="https://asr.vietspeech.com/speech">https://asr.vietspeech.com/speech</a>
        </li>
        <li>
          <p>Các tùy chọn cho request được chỉ định trong HEADER như sau:</p>
          <code>'token': <span><b>(string)</b> token dùng để xác thực người dùng. Bỏ trống nếu bạn muốn request nặc danh.</span></code>
        </li>
        <li>
          <p>Các tùy chọn cho request được chỉ định trong url parameter như sau:</p>
          <code>'model': <span><b>(string)</b> mã mô hình nhận dạng</span></code>
        </li>
        <li>
          <p>Các thông tin tùy chọn về audio trong header như sau:</p>
          <code>'sample_rate': <span><b>(float)</b> sample rate (tần số lấy mẫu) của file audio.</span></code>
          <code>'format': <span><b>(string)</b> format của audio ví dụ S16LE là *signed 16 bit little</span></code>
        </li>
        <li>
          <p>Request: multipart upload file với thông tin:</p>
          <code>'voice'='file', 'filename'=$FILE_PATH</code>
        </li>
      </ul>
      <h2>Định dạng data gửi lên: Multipart Form (default)</h2>
      <code>
        <span>"text": </span> "hệ thống cung cấp dịch vụ nhận dạng âm thanh tiếng Việt",
    <br />
        <span>"voice": </span> $FILE_BINARY
  </code>
      <br />
      <br />
      <h2>Mô tả các tham số:</h2>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Tham số</th>
            <th scope="col">Giá trị mặc định</th>
            <th scope="col">Mô tả</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>fieldName</td>
            <td>voice</td>
            <td>trường của tập tin trong body của request</td>
          </tr>
          <tr>
            <td>fieldEncoding</td>
            <td>
              <code>
                [
                AMR, AMR_WB,
            <br />
            ENCODING_UNSPECIFIED,
            <br />
            FLAC, LINEAR16
            ]
            </code>
            </td>
            <td>định dạng mã hóa của tập tin âm thanh</td>
          </tr>
          <tr>
            <td>fieldTimeout</td>
            <td>10000</td>
            <td>thời gian hết hạn request</td>
          </tr>
          <tr>
            <td>fieldSampleRate</td>
            <td>16000Hz</td>
            <td>tần số của tập tin âm thanh</td>
          </tr>
          <tr>
            <td>fieldMaxSize</td>
            <td>10024 Mb</td>
            <td>kích thước tối đa của tập tin</td>
          </tr>
          <tr>
            <td>authorize</td>
            <td>Bearer $TOKEN</td>
            <td>xác thực của người dùng</td>
          </tr>
        </tbody>
      </table>
      <br />
      <h2>Example output</h2>
      <h4>Thành công</h4>
      <p style={{ width: 300 }}><code style={{ width: 150 }}>returncode</code>    1</p>
      <p><code>returnmessage</code> Success</p>
      <p><code>text</code>  $RESULT_TEXT</p>
      <p>Trong đó: <code>RESULT_TEXT:</code> kết quả dịch tập tin âm thanh</p>
      <br />
      <h4>Thất bại khi dịch tập tin</h4>
      <p><code>returncode</code>    -2</p>
      <p><code>returnmessage</code> "Error when handle data from file wav"</p>
      <p><code>text</code>          ""</p>
      <br />
      <h4>Thất bại khi gửi request</h4>
      <p><code>returncode</code>    400</p>
      <p><code>returnmessage</code> "POST method error"</p>
      <p><code>text</code>          ""</p>
      <h2>CURL</h2>
      <span style={{ overflow: true }}><b>curl </b>--request POST -H <code>"Authorization: Bearer $TOKEN</code> https://asr.vietspeech.com/speech</span>
      <p>Trong đó:</p>
      <span>
        <p>- <code>TOKEN</code>: mã truy cập mua hoặc được chia sẻ trong dự án</p>
      </span>
      <p>Nếu muốn cài đặt cho quá trình nhận dạng, bạn phải cung cấp thêm các thông tin cần thiết vào HEADER như sau:</p>
      <span style={{ overflow: true }}>-H <code>"sample_rate:$SAMPLE_RATE"</code> -H <code>"audioEncoding:$AUDIO_ENCODING"</code> -H <code>"sampleRate:$SAMPLE_RATE"</code> -H <code>"timeOut: $TIME_OUT"</code> -H <code>"maxSize: $MAX_SIZE"</code></span>
      <p>Trong đó:</p>
      <span style={{ overflow: true }}>
        <p>- <code>SAMPLE_RATE</code>: tầng số của tập tin âm thanh</p>
        <p>- <code>AUDIO_ENCODING</code>: loại encode của tập tin âm thanh</p>
        <p>- <code>TIME_OUT</code>: thời gian hết hạn của request</p>
      </span>
    </Content>
  </>
  const jsSDK = <>
    <Header className="site-layout-background h2" style={{ padding: 0, margin: 0, fontSize: '18px', fontWeight: 'bold' }} >
      Npm SDK - Speech To Text
                    </Header>
    <Content
      className="site-layout-background"
      style={{
        margin: 0,
        minHeight: 350,
      }}
    >
      <p>Tài liệu này sẽ hướng dẫn gửi request đến Speech-To-Text API bằng ngôn ngữ JavaScript sử dụng thư viện SDK trên <code>NPM Package</code>.</p>
      <br />
      <h2>Cài đặt thư viện</h2>
      <p>Trước khi cài đặt, hãy đảm bảo đã chuẩn bị môi trường lập trình Node.js, sau đó sử dụng lệnh sau để cài đặt</p>
      <code>npm install --save asr-vietspeech</code>
      <br />
      <br />
      <h2>Tạo dữ liệu âm thanh</h2>
      <p>Để bắt đầu sử dụng, chúng ta cần đăng ký tài khoản trên hệ thống VietSpeech sau đó mua 1 API key hoặc sử dụng API key miễn phí hằng ngày.</p>
      <p>Hãy dựa theo ví dụ dưới đây để sử dụng thư viện</p>
      <span className="lead tnx-id">
        <div className="copy-wrap w-100">
          <span className="copy-feedback" />
          <button type="button" className="copy-trigger copy-clipboard" data-clipboard-text={jsCode}>
            <em className="ti ti-files" />
          </button>
        </div>
      </span>

      <MonacoEditor
        width="90%"
        height="400"
        options={monacoOptions}
        value={jsCode}
      />
      <br />
      <h2>Tài nguyên</h2>
      <p>Github: <a href="https://github.com/trankhanhlinh/vispeech-asr">https://github.com/trankhanhlinh/vispeech-asr</a></p>
      <p>NPM Package: <a href="https://www.npmjs.com/package/asr-vietspeech">https://www.npmjs.com/package/asr-vietspeech</a></p>
      <p>Ngoài ra, nếu bạn khởi tạo dự án từ đầu thì có thể sử dụng mã nguồn dự án mẫu chúng tôi đã tạo từ <code>create-react-app</code> và tích hợp SDK Asr-ViSpeech tại <a href="https://github.com/trankhanhlinh/vispeech-asr/tree/master/samples/node">https://github.com/trankhanhlinh/vispeech-asr/tree/master/samples/node</a></p>
      <p>Hoặc có thể tải về bằng Git bằng lệnh <code>git clone https://github.com/trankhanhlinh/vispeech-asr</code></p>
    </Content>
  </>
  const csharpSDK = <>
    <Header className="site-layout-background h2" style={{ padding: 0, margin: 0, fontSize: '18px', fontWeight: 'bold' }} >
      NuGet SDK - Speech To Text
    </Header>
    <Content
      className="site-layout-background"
      style={{
        margin: 0,
        minHeight: 350,
      }}
    >
      <p>Tài liệu này sẽ hướng dẫn gửi request đến Speech-To-Text API bằng ngôn ngữ CSharp sử dụng thư viện SDK trên <code>NuGet Package</code>.</p>
      <br />
      <h2>Cài đặt thư viện</h2>
      <p>Trước khi cài đặt, hãy đảm bảo đã chuẩn bị môi trường lập trình CSharp, sau đó sử dụng lệnh sau để cài đặt</p>
      <code>Install-Package asr-vietspeech -Version 1.0.0</code>
      <br />
      <br />
      <h2>Tạo dữ liệu âm thanh</h2>
      <p>Để bắt đầu sử dụng, chúng ta cần đăng ký tài khoản trên hệ thống VietSpeech sau đó mua 1 API key hoặc sử dụng API key miễn phí hằng ngày.</p>
      <p>Hãy dựa theo ví dụ dưới đây để sử dụng thư viện</p>
      <span className="lead tnx-id">
        <div className="copy-wrap w-100">
          <span className="copy-feedback" />
          <button type="button" className="copy-trigger copy-clipboard" data-clipboard-text={csharpCode}>
            <em className="ti ti-files" />
          </button>
        </div>
      </span>

      <MonacoEditor
        width="90%"
        height="400"
        options={monacoOptions}
        value={csharpCode}
      />
      <br />
      <h2>Tài nguyên</h2>
      <p>Github: <a href="https://github.com/thanhtinhpas1/asr-sdk-csharp">https://github.com/thanhtinhpas1/asr-sdk-csharp</a></p>
      <p>NuGet Package: <a href="https://www.nuget.org/packages/asr-vietspeech/">https://www.nuget.org/packages/asr-vietspeech/</a></p>
      <p>Ngoài ra, nếu bạn khởi tạo dự án từ đầu thì có thể sử dụng mã nguồn dự án mẫu chúng tôi đã tạo và tích hợp SDK Asr-ViSpeech tại <a href="https://github.com/thanhtinhpas1/asr-sdk-csharp/tree/master/samples/AppSample">https://github.com/thanhtinhpas1/asr-sdk-csharp/tree/master/samples/AppSample</a></p>
      <p>Hoặc có thể tải về bằng Git bằng lệnh <code>git clone https://github.com/thanhtinhpas1/asr-sdk-csharp</code></p>
    </Content>
  </>
  const javaSDK = <>
    <Content
      className="site-layout-background"
      style={{
        margin: 0,
        minHeight: 350,
      }}
    >
      <p>Tài liệu này sẽ hướng dẫn gửi request đến Speech-To-Text API bằng ngôn ngữ Java sử dụng thư viện SDK trên <code>Maven Package</code>.</p>
      <br />
      <h2>Cài đặt thư viện</h2>
      <p>
        Nếu bạn đang sử dụng <a href="https://maven.apache.org/">Maven</a>, thêm những thông tin sau vào{' '}
        <b>pom.xml</b>
        <br />
        <code>
          <span className="tag main-color">&lt;dependency&gt;</span>
          <br />
          <span className="tag ml-4">&lt;groupId&gt;</span>com.github.thanhtinhpas1
                    <span className="tag">&lt;&#47;groupId&gt;</span>
          <br />
          <span className="tag ml-4">&lt;artifactId&gt;</span>asr-vietspeech
                    <span className="tag">&lt;&#47;artifactId&gt;</span>
          <br />
          <span className="tag ml-4">&lt;version&gt;</span>0.0.2
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
      <br />
      <br />
      <h2>Tạo dữ liệu âm thanh</h2>
      <p>Để bắt đầu sử dụng, chúng ta cần đăng ký tài khoản trên hệ thống VietSpeech sau đó mua 1 API key hoặc sử dụng API key miễn phí hằng ngày.</p>
      <p>Hãy dựa theo ví dụ dưới đây để sử dụng thư viện</p>
      <span className="lead tnx-id">
        <div className="copy-wrap w-100">
          <span className="copy-feedback" />
          <button type="button" className="copy-trigger copy-clipboard" data-clipboard-text={javaCode}>
            <em className="ti ti-files" />
          </button>
        </div>
      </span>

      <MonacoEditor
        width="90%"
        height="400"
        options={monacoOptions}
        value={javaCode}
      />
      <br />
      <h2>Tài nguyên</h2>
      <p>Github: <a href="https://github.com/thanhtinhpas1/asr-sdk-java">https://github.com/thanhtinhpas1/asr-sdk-java</a></p>
      <p>Maven Package: <a href="https://search.maven.org/artifact/com.github.thanhtinhpas1/asr-vietspeech/0.0.2/jar">https://search.maven.org/artifact/com.github.thanhtinhpas1/asr-vietspeech/0.0.2/jar</a></p>
      <p>Ngoài ra, nếu bạn khởi tạo dự án từ đầu thì có thể sử dụng mã nguồn dự án mẫu chúng tôi đã tạo và tích hợp SDK Asr-ViSpeech tại <a href="https://github.com/thanhtinhpas1/asr-sdk-java/tree/master/samples/maven">https://github.com/thanhtinhpas1/asr-sdk-java/tree/master/samples/maven</a></p>
      <p>Hoặc có thể tải về bằng Git bằng lệnh <code>git clone https://github.com/thanhtinhpas1/asr-sdk-java</code></p>
    </Content>
  </>
  const envNodejs = <>
    <Header className="site-layout-background h2" style={{ padding: 0, margin: 0, fontSize: '18px', fontWeight: 'bold' }} >
      Cài đặt môi trường Node.js - Speech To Text
    </Header>
    <Content
      className="site-layout-background"
      style={{
        margin: 0,
        minHeight: 350,
      }}
    >
      <p>Phần này sẽ hướng dẫn bạn chuẩn bị môi trường lập trình Node.js.</p>
      <h2>Mục tiêu</h2>
      <ul style={{ listStyleType: 'circle' }}>
        <li>Cài đặt NVM Window</li>
        <li>Cài đặt Node.js và npm (Node Package Manager)</li>
        <li>Cài đặt editor</li>
        <li>Cài đặt VietSpeech SDK cho Node.js</li>
      </ul>
      <br />
      <h2>Cài đặt NVM Window</h2>
      <p>NVM là một <code>bash script</code> cho quản lý việc cài đặt Node.js và NPM. Cho nhiều thông tin, xem <a href="https://github.com/coreybutler/nvm-windows">"https://github.com/coreybutler/nvm-windows"</a> </p>
      <p>Ngoài ra, có thể xem tại đây để có hướng dẫn cài đặt <a href="https://github.com/nvm-sh/nvm#installation">https://github.com/nvm-sh/nvm#installation</a></p>
      <br />
      <h2>Cài đặt Node.js và npm</h2>
      <p>Sau khi NVM đã được cài đặt, chúng ta có thể bắt đầu cài đặt Node.js và NPM. </p>
      <p>1. Để cài đặt phiên bản mới nhất của Node.js, chạy lệnh sau</p>
      <code style={{ marginLeft: '5%' }}>nvm install stable</code>
      <p>2. Kiểm tra phiên bản Node.js</p>
      <code style={{ marginLeft: '5%' }}>node -v</code>
      <p>NPM là Node Package Manager cho Node.js and thường được cài đặt cùng Node.js.</p>
      <p>Ví dụ, bạn có thể cài đặt từ npm repository</p>
      <code style={{ marginLeft: '5%' }}>npm install --save express</code>
      <br />
      <br />
      <h2>Cài đặt editor</h2>
      <p>Dưới đây là vài công cụ lập trình có thể sử dụng:</p>
      <ul style={{ listStyleType: 'circle' }}>
        <li>
          <a href="https://www.sublimetext.com/">Sublime text</a>
          <br />
          <a href="https://atom.io/">Atom</a>
          <br />
          <a href="https://code.visualstudio.com/">Visual Studio Code</a>
          <br />
          <a href="https://www.jetbrains.com/idea/">IntelliJ</a>
        </li>
      </ul>
    </Content>
  </>
  const commandLine = <>
    <Header className="site-layout-background h2" style={{ padding: 0, margin: 0, fontSize: '18px', fontWeight: 'bold' }} >
      Command Line - Speech To Text
    </Header>
    <Content
      className="site-layout-background"
      style={{
        margin: 0,
        minHeight: 350,
      }}
    >
      <p>Phần này hướng dẫn cách để gửi request đến Speech-To-Text API sử dụng Rest Interface và curl command</p>
      <br />
      <h2>Tạo audio transcript request</h2>
      <p>Bây giờ bạn có thể sử dụng Speech-To-Text để chuyển đổi tập tin âm thanh sang văn bản. Dựa theo</p>
      <p>1. Create một tập tin JSON dưới định dạng tập tin txt</p>
      <pre>
        {commandLineText}
      </pre>
      <p>Đoạn mã JSON này cho biết rằng tệp âm thanh có định dạng mã hóa FLAC, tốc độ lấy mẫu là 16000 Hz và tệp âm thanh được lưu trữ trên Firebase Store tại URI nhất định. Tệp âm thanh có thể truy cập công khai, vì vậy bạn không cần thông tin xác thực để truy cập tệp.</p>
      <p>2. Use curl để tạo 1 speech request</p>
      <pre>curl -s -H "Content-Type: application/json" \
      -H "Authorization: Bearer "$(gcloud auth application-default print-access-token) \
      https://speech.googleapis.com/v1/speech:recognize \
    -d @sync-request.json</pre>
    </Content>
  </>
  const columns = [
    {
      title: 'Plan',
      dataIndex: 'plan',
      key: 'plan',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Price (VND)',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
  ]
  const data = [
    {
      plan: 'Dùng thử',
      quantity: '60 phút',
      price: 'Miễn phí',
      description: '60 phút/ mỗi ngày',
    },
    {
      plan: 'Gói 1',
      quantity: '50 phút',
      price: '10.000 vnđ',
      description: 'Hỗ trợ kỹ thuật',
    },
    {
      plan: 'Gói 2',
      quantity: '200 phút',
      price: '20.000 vnđ',
      description: 'Hỗ trợ kỹ thuật',
    },
    {
      plan: 'Gói 3',
      quantity: '500 phút',
      price: '40.000 vnđ',
      description: 'Hỗ trợ kỹ thuật',
    },
    {
      plan: 'Gói cao cấp',
      quantity: '> 1000 phút',
      price: 'Deal',
      description: 'Vui lòng liên hệ HotLine: 0962804643, Email: vispeech@gmail.com',
    }
  ]
  const information = <>
    <Header className="site-layout-background h2" style={{ padding: 0, margin: 0, fontSize: '18px', fontWeight: 'bold' }} >
      Thông tin - Speech To Text
    </Header>
    <Content
      className="site-layout-background"
      style={{
        margin: 0,
        minHeight: 350,
      }}
    >
      <h2>Giới thiệu</h2>
      <p>
        Giọng nói là một công cụ giao tiếp phổ biến và cũng là đối tượng nghiên cứu của nhiều ngành khoa học khác nhau. Tiếng nói của con người là vô tận. Từ được phát âm từ cùng một người, tại cùng một tình huống phát âm ở hai thời điểm phát âm khác nhau, sẽ tạo ra hai mẫu khác nhau
      </p>
      <br />
      <h2>Giá sử dụng</h2>
      <Table columns={columns} dataSource={data} />
    </Content>
  </>
  return (
    <div className="page-content documents-page">
      <div className="container">
        <div className="content-area card">
          <div className="card-innr card-innr-fix">
            <div className="card-body">
              <Layout style={{ backgroundColor: 'white' }}>
                <Sider width={'25%'} style={{
                }} className="site-layout-background">
                  <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['info1']}
                    style={{ height: '100%', borderRight: 0 }}
                  >
                    <SubMenu key="info1" icon={<PayCircleOutlined />} title="Thông tin chung">
                      <Menu.Item key="1" onClick={() => setContent(information)}>Thông tin</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub1" icon={<UserOutlined />} title="Nhận dạng tiếng nói">
                      <Menu.Item key="1" onClick={() => setContent(restfultAPI)}>Restful API</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<LaptopOutlined />} title="Sử dụng thư viện">
                      <Menu.Item onClick={() => setContent(jsSDK)} key="3">NPM Package (JavaScript)</Menu.Item>
                      <Menu.Item onClick={() => setContent(csharpSDK)} key="4">NuGet Package (CSharp)</Menu.Item>
                      <Menu.Item onClick={() => setContent(javaSDK)} key="5">Maven Package (Java)</Menu.Item>
                      <Menu.Item onClick={() => setContent(commandLine)} key="6">Sử dụng command line</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub3" icon={<AimOutlined />} title="Chuẩn bị môi trường">
                      <Menu.Item onClick={() => setContent(envNodejs)} key="7">Cài đặt môi trường Node.js</Menu.Item>
                    </SubMenu>
                  </Menu>
                </Sider>
                <Layout className="site-layout" style={{ marginLeft: '5%' }}>
                  {content || information}
                </Layout>
              </Layout>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default DocumentsPage
