node-red-contrib-etriopenapi
================

Node-RED node for etriopenapi



## Install

To install the stable version use the `Menu - Manage palette - Install`
option and search for node-red-contrib-etriopenapi, or run the following
command in your Node-RED user directory, typically `~/.node-red`

    npm install node-red-contrib-etriopenapi

## Wrapper etriopenapi  API  
- https://aiopen.etri.re.kr/serviceList

## Sample parameters
```js

msg.params = {};
msg.params.text = 'test'; //#검색어
msg.params.openapi = 'ko' //# openapi language code

return msg;

```
## Sample flows
```json
[
    {
        "id": "f3650109a893ec0f",
        "type": "etriopenapi",
        "z": "6cceedf385c58a9c",
        "name": "",
        "text": "",
        "openapi": "",
        "creds": "82f40c032eeb38b8",
        "x": 510,
        "y": 40,
        "wires": [
            [
                "6808585b9ab71581"
            ]
        ]
    },
    {
        "id": "87c1e4795e32bc81",
        "type": "inject",
        "z": "6cceedf385c58a9c",
        "name": "",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "x": 140,
        "y": 40,
        "wires": [
            [
                "ec17be0bb3639763"
            ]
        ]
    },
    {
        "id": "ec17be0bb3639763",
        "type": "function",
        "z": "6cceedf385c58a9c",
        "name": "set params",
        "func": "// https://aiopen.etri.re.kr/serviceList\n// #어휘관계분석\n// ParaphraseQA 문장 패러프레이즈 인식 API {'argument': {'question': question, 'type': type}}\n// WiseWWN/Word 어휘 정보 API {'argument': {'word': word}}\n// WiseWWN/Homonym 동음이의어 정보 API {'argument': {'word': word}}\n// WiseWWN/Polysemy 다의어 정보 API {'argument': {'word': word}}\n// WiseWWN/WordRel 어휘 간 유사도 분석 API {'argument': {'first_word': first_word, 'first_sense_id': first_sense_id, 'second_word': second_word, 'second_sense_id': second_sense_id }}\n// NELinking 개체 연결(NE Linking) API {'argument': {'contents': contents}}\n// Coreference 상호참조 해결 API {'argument': {'text': text}}\n// #질의응답\n// WiseQAnal 질문분석 API {'argument': {'text': text}}\n// MRCServlet 기계독해 API {'argument': {'question': question, 'passage': passage}}\n// WikiQA 위키백과 QA API  {'argument': {'question': question, 'type': type}}\n// LegalQA 법률 QA API  {'argument': {'question': question}}\n// DocUpload and DocQA 행정문서 QA API  {'argument': {'question': question, 'type': type}}\n\nmsg.openapi = 'WiseWWN/Word';\nmsg.params  ={};\nmsg.params.argument = {};\nmsg.params.argument.word = '테스트';\n\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 330,
        "y": 40,
        "wires": [
            [
                "f3650109a893ec0f"
            ]
        ]
    },
    {
        "id": "6808585b9ab71581",
        "type": "debug",
        "z": "6cceedf385c58a9c",
        "name": "debug 1",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 720,
        "y": 40,
        "wires": []
    },
    {
        "id": "82f40c032eeb38b8",
        "type": "etriOpenaiApiKey",
        "name": "key"
    }
]
```

## Sample results
```json
{"result":0,"return_object":{"MetaInfo":{"Title":"","Link":""},"WWN WordInfo":[{"Word":"테스트","HomonymCode":0,"WordInfo":[{"PolysemyCode":0,"Definition":"사람의 학력, 지능, 능력이나 제품의 성능 따위를 알아보기 위하여 검사하거나 시험함. 또는 그런 검사나 시험. '검사', '시험'으로 순화.","POS":"n","Hypernym":["검사_0300"],"Hypornym":["프로그램테스트_0000"]}],"Synonym":[],"Antonym":[]}]}}
```
