const axios = require("axios");
module.exports = function (RED) {
    function FunctionNode(n) {
        RED.nodes.createNode(this, n);
        if (RED.nodes.getNode(n.creds)){
            this.access_key = RED.nodes.getNode(n.creds).credentials.access_key;
        } else {
            this.access_key = "";
        }
        var node = this;
        this.name = n.name;

        for (var key in n) {
            node[key] = n[key] || "";
        }
        this.on('input', function (msg) {
            for (var i in msg) {
                if (i !== 'req' | i !== 'res' | i !== 'payload' | i !== 'send' | i !== '_msgid') {
                    node[i] = msg[i] || node[i] ;
                }
            }
            if(!node.url){
                node.url = 'http://aiopen.etri.re.kr:8000/';
            }

            node.options = {};
            node.options.headers = {};

            // node.params = {};
            // node.params.text = node.text;
            // node.params.openapi = node.openapi;

            node.options.headers['Authorization'] = node.access_key;
            node.options.headers['Content-Type'] = 'application/json';
// #어휘관계분석
// ParaphraseQA 문장 패러프레이즈 인식 API {'argument': {'question': question, 'type': type}}
// WiseWWN/Word 어휘 정보 API {'argument': {'word': word}}
// WiseWWN/Homonym 동음이의어 정보 API {'argument': {'word': word}}
// WiseWWN/Polysemy 다의어 정보 API {'argument': {'word': word}}
// WiseWWN/WordRel 어휘 간 유사도 분석 API {'argument': {'first_word': first_word, 'first_sense_id': first_sense_id, 'second_word': second_word, 'second_sense_id': second_sense_id }}
// NELinking 개체 연결(NE Linking) API {'argument': {'contents': contents}}
// Coreference 상호참조 해결 API {'argument': {'text': text}}
// #질의응답
// WiseQAnal 질문분석 API {'argument': {'text': text}}
// MRCServlet 기계독해 API {'argument': {'question': question, 'passage': passage}}
// WikiQA 위키백과 QA API  {'argument': {'question': question, 'type': type}}
// LegalQA 법률 QA API  {'argument': {'question': question}}
// DocUpload and DocQA 행정문서 QA API  {'argument': {'question': question, 'type': type}}

            node.url = node.url + node.openapi;
            axios.post(node.url, node.params, node.options)
                .then(function (response){
                    msg.payload = response.data;
                    node.send(msg);
                }).catch(function (err){
                    msg.payload = err;
                    node.send(msg);
                });
        });
    }

    RED.nodes.registerType("etriopenapi", FunctionNode, {
        credentials: {
            access_key: {type:"text"},
        }
    });

    function etriOpenaiApiKey(n){
        RED.nodes.createNode(this, n);
        this.access_key = n.access_key;
    }

    RED.nodes.registerType("etriOpenaiApiKey", etriOpenaiApiKey,{
        credentials: {
            access_key: {type:"text"}
        }
    });
};
