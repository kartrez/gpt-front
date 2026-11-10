import{_ as He}from"./DwHkYm_e.js";import{A as Ve}from"./-fXkCpiM.js";import{D as Ae}from"./BozHYTMY.js";import{a as W}from"./VFUWW1gp.js";import{p as Pe}from"./D9CR2W5C.js";import{_ as Je,u as Fe,P as Qe,q as v,I as We,j as A,a3 as K,y as Ze,k as Xe,c as u,w as s,r as p,o as l,e as i,i as q,b as t,g,F as _,h as x,t as r,v as Z,f as o,a8 as z}from"./DiG_2det.js";import{u as et}from"./B7pVLqNn.js";const tt={class:"text-subtitle-1 font-weight-bold mb-1"},at={class:"text-body-2"},it={class:"d-flex flex-column flex-md-row align-md-center ga-4"},st={class:"flex-shrink-0"},ot={class:"text-body-1 mb-3"},nt={class:"d-flex flex-wrap mb-2",style:{gap:"4px"}},lt={class:"code-block position-relative mb-4"},rt={class:"limits-list text-body-1"},pt={class:"text-body-1 mb-3"},dt={class:"code-block position-relative"},ct={class:"code-block position-relative mb-4"},mt={class:"code-block position-relative"},ut={class:"d-flex flex-wrap ga-1"},gt={class:"code-block position-relative"},ht={class:"d-flex flex-wrap mb-3 ga-1"},ft={class:"d-flex flex-wrap mb-3 ga-1"},yt={class:"d-flex flex-wrap ga-1"},vt={class:"code-block position-relative"},bt={class:"d-flex flex-wrap ga-1"},_t={class:"code-block position-relative"},xt={class:"d-flex flex-wrap align-center mb-3 ga-2"},kt={class:"endpoint-url"},Tt={class:"text-subtitle-1 font-weight-medium mb-1"},wt={class:"text-body-2 text-medium-emphasis mb-4"},At={class:"d-flex align-center mb-2 ga-2"},Pt={"data-label":"Параметр"},It={"data-label":"Тип"},Ct={class:"text-body-2 text-medium-emphasis"},qt={"data-label":"Обязательный"},zt={key:2,class:"text-caption text-medium-emphasis"},Ot={"data-label":"По умолчанию"},Et={key:0},jt={key:1,class:"text-caption text-medium-emphasis"},$t={"data-label":"Описание",class:"text-body-2"},St={key:1,class:"text-body-2 text-medium-emphasis mb-4"},Rt={class:"code-block position-relative"},Gt={class:"toc-sticky position-sticky overflow-y-auto pl-4"},Lt=6,Ie=`{
  "message": "Запрос отправлен к модели \`nope/nope\`, которой нет, проверьте на сайте поддерживаемые модели https://gpt-chat.by/pricing",
  "errors": [
    { "field": "model", "message": "Запрос отправлен к модели \`nope/nope\`, которой нет..." }
  ]
}`,X="https://api.gpt-chat.by/api",Ut={__name:"doc-api",async setup(Nt){let h,P;Fe({title:"API нейросетей в Беларуси: GPT, Claude, Gemini — оплата в BYN",description:`API к GPT, Claude, Gemini и DeepSeek в формате OpenAI: подключение сменой base_url. Оплата в BYN от ${W} BYN, без VPN. Примеры на Python, Node.js, cURL и PHP.`,keywords:"API нейросетей, ChatGPT API Беларусь, Claude API, Gemini API, OpenAI совместимый API, API оплата BYN, GPT-Chat API",robots:"index, follow"});const Ce=Qe(),qe=et(),ze=v(()=>qe.value&&Ce.loggedIn),{mobile:ee}=We(),$=A("text"),te=A("curl"),ae=A("curl"),ie=A("curl"),se=A("curl"),f=A(null),oe=A(null),S=new Ve,{data:R}=([h,P]=K(()=>S.getList()),h=await h,P(),h),{data:Y}=([h,P]=K(()=>S.getImageGenerationList()),h=await h,P(),h),{data:ne}=([h,P]=K(()=>S.getVideoGenerationList()),h=await h,P(),h),{data:Oe}=([h,P]=K(()=>S.getAudioGenerationList()),h=await h,P(),h),M=n=>{const e=new Set,d=[];for(const c of n){const T=c.split("/")[0];if(!e.has(T)&&(e.add(T),d.push(c),d.length===Lt))break}return d},le=n=>Math.max(0,n.length-M(n).length),G=(n,e="",d="")=>{const c=n.value?.length||0;return c===0?"":e?`${e} ${c}${d}`:` (${c})`},Ee=[{code:400,when:"Неверный запрос: неизвестная модель, пустой или слишком длинный промпт, неподдерживаемый файл, нарушение любых ограничений полей"},{code:401,when:"Нет заголовка Authorization, ключ не найден, отозван или просрочен"},{code:402,when:"Не хватает баланса на оценочную стоимость запроса. В теле есть balance, estimatedCost и shortfall"},{code:403,when:"Ключ есть, но доступа к этому ресурсу нет"},{code:404,when:"Объект не найден: чужая или удалённая коллекция, истёкшая задача генерации"},{code:429,when:"Слишком часто. Действует на распознавание речи, презентации и разбор брендбука"},{code:500,when:"Ошибка на нашей стороне — запрос можно повторить"}],je=v(()=>(R.value||[]).map(n=>n.name)),re=n=>{const e=new Set(je.value);return n.filter(d=>e.has(d))},pe=v(()=>(R.value||[]).filter(n=>(n.input_modalities||[]).includes("image")).map(n=>n.name)),$e=v(()=>M(pe.value)),de=v(()=>le(pe.value)),ce=v(()=>(Y.value||[]).map(n=>n.name)),Se=v(()=>M(ce.value)),me=v(()=>le(ce.value)),Re=[{ratio:"1:1",size:"1024×1024"},{ratio:"2:3",size:"832×1248"},{ratio:"3:2",size:"1248×832"},{ratio:"3:4",size:"864×1184"},{ratio:"4:3",size:"1184×864"},{ratio:"4:5",size:"896×1152"},{ratio:"5:4",size:"1152×896"},{ratio:"9:16",size:"768×1344"},{ratio:"16:9",size:"1344×768"},{ratio:"21:9",size:"1536×672"}],Ge=[{size:"0.5K",label:"черновик"},{size:"1K",label:"стандарт"},{size:"2K",label:"высокое"},{size:"4K",label:"максимум"}],Le=[{value:"python",label:"Python"},{value:"js",label:"Node.js"}],I=A("python"),L=v(()=>re(["anthropic/claude-sonnet-latest","google/gemini-flash-latest"])[0]||"google/gemma-4"),ue=v(()=>({python:`from openai import OpenAI

client = OpenAI(
    api_key="YOUR_API_KEY",
    base_url="${X}",
)

response = client.chat.completions.create(
    model="${L.value}",
    messages=[{"role": "user", "content": "Привет! Как дела?"}],
)
print(response.choices[0].message.content)

# Потоковый ответ
stream = client.chat.completions.create(
    model="${L.value}",
    messages=[{"role": "user", "content": "Напиши короткое стихотворение"}],
    stream=True,
)
for chunk in stream:
    if chunk.choices and chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="")`,js:`import OpenAI from "openai";

const client = new OpenAI({
  apiKey: "YOUR_API_KEY",
  baseURL: "${X}",
});

const response = await client.chat.completions.create({
  model: "${L.value}",
  messages: [{ role: "user", content: "Привет! Как дела?" }],
});
console.log(response.choices[0].message.content);

// Потоковый ответ
const stream = await client.chat.completions.create({
  model: "${L.value}",
  messages: [{ role: "user", content: "Напиши короткое стихотворение" }],
  stream: true,
});
for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0]?.delta?.content ?? "");
}`})),D=v(()=>(R.value||[]).filter(n=>n.name!=="embedding").length),H=v(()=>(Y.value||[]).length),ge=v(()=>(ne.value||[]).length),Ue=v(()=>[{icon:"mdi-swap-horizontal",title:"Формат OpenAI",text:"Работают официальные библиотеки OpenAI для Python и Node.js: меняете ключ и base_url, остальной код прежний."},{icon:"mdi-brain",title:D.value>0?`${D.value} ${Pe(D.value,"текстовая модель","текстовые модели","текстовых моделей")}`:"Десятки моделей",text:"GPT, Claude, Gemini, DeepSeek, Grok, Qwen и другие."+(H.value>0&&ge.value>0?` Плюс ${H.value} ${Pe(H.value,"модель","модели","моделей")} картинок и ${ge.value} — видео.`:" Плюс генерация картинок и видео.")},{icon:"mdi-cash-multiple",title:"Оплата в BYN",text:`Общий баланс, пополнение от ${W} BYN картой. Без VPN и иностранной карты, списание по факту, без подписки.`},{icon:"mdi-lightning-bolt-outline",title:"Поток, картинки, инструменты",text:"Потоковые ответы (stream), картинки на вход, вызов инструментов (tools), генерация картинок и видео."}]),Ne=v(()=>re(["qwen/plus-latest","qwen/max-latest","google/gemini-flash-latest","deepseek/deepseek-pro-latest","anthropic/claude-sonnet-latest","openai/gpt-5.6-terra"])),k={text:{curl:`curl https://api.gpt-chat.by/api/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "model": "google/gemma-4",
    "messages": [
      {"role": "user", "content": "Привет! Как дела?"}
    ]
  }'`,python:`import requests

url = "https://api.gpt-chat.by/api/chat/completions"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
data = {
    "model": "google/gemma-4",
    "messages": [{"role": "user", "content": "Привет! Как дела?"}]
}

response = requests.post(url, headers=headers, json=data)
print(response.json())`,php:`<?php
$ch = curl_init("https://api.gpt-chat.by/api/chat/completions");
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json",
    "Authorization: Bearer YOUR_API_KEY"
]);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    "model" => "google/gemma-4",
    "messages" => [["role" => "user", "content" => "Привет! Как дела?"]]
]));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
echo $response;`,js:`fetch("https://api.gpt-chat.by/api/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer YOUR_API_KEY"
  },
  body: JSON.stringify({
    model: "google/gemma-4",
    messages: [{ role: "user", content: "Привет! Как дела?" }]
  })
})
.then(res => res.json())
.then(console.log);`,response:`{
  "id": "chatcmpl-123",
  "choices": [{
    "message": {
      "role": "assistant",
      "content": "Привет! У меня всё отлично, чем могу помочь?"
    }
  }]
}`},multimodal:{curl:`curl https://api.gpt-chat.by/api/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "model": "google/gemini-flash-latest",
    "messages": [
      {
        "role": "user",
        "content": [
          {"type": "text", "text": "Что на этих картинках?"},
          {"type": "image_url", "image_url": {"url": "https://example.com/image.jpg"}},
          {"type": "image_url", "image_url": {"url": "data:image/jpeg;base64,/9j/4AAQ..."}}
        ]
      }
    ]
  }'`,python:`import requests

url = "https://api.gpt-chat.by/api/chat/completions"
headers = {"Authorization": "Bearer YOUR_API_KEY"}
data = {
    "model": "google/gemini-flash-latest",
    "messages": [{
        "role": "user",
        "content": [
            {"type": "text", "text": "Что на этих картинках?"},
            {"type": "image_url", "image_url": {"url": "https://example.com/image.jpg"}},
            {"type": "image_url", "image_url": {"url": "data:image/jpeg;base64,/9j/..."}}
        ]
    }]
}
response = requests.post(url, headers=headers, json=data)
print(response.json())`,php:`<?php
$data = [
    "model" => "google/gemini-flash-latest",
    "messages" => [[
        "role" => "user",
        "content" => [
            ["type" => "text", "text" => "Что на этих картинках?"],
            ["type" => "image_url", "image_url" => ["url" => "https://example.com/image.jpg"]],
            ["type" => "image_url", "image_url" => ["url" => "data:image/jpeg;base64,/9j/..."]]
        ]
    ]]
];
// ... (curl setup as in text example)`,js:`const response = await fetch("https://api.gpt-chat.by/api/chat/completions", {
  method: "POST",
  headers: { "Authorization": "Bearer YOUR_API_KEY", "Content-Type": "application/json" },
  body: JSON.stringify({
    model: "google/gemini-flash-latest",
    messages: [{
      role: "user",
      content: [
        { type: "text", text: "Что на этих картинках?" },
        { type: "image_url", image_url: { url: "https://example.com/image.jpg" } },
        { type: "image_url", image_url: { url: "data:image/jpeg;base64,/9j/..." } }
      ]
    }]
  })
});`,response:`{
  "choices": [{
    "message": {
      "role": "assistant",
      "content": "На первом изображении мы видим пейзаж, а на втором..."
    }
  }]
}`},image:{curl:`curl https://api.gpt-chat.by/api/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "model": "google/gemini-2.5-flash-image",
    "imageConfig": {
        "aspect_ratio": "16:9",
        "image_size": "4K"
    },
    "messages": [
      {"role": "user", "content": "Нарисуй рыжего кота в космосе"}
    ]
  }'`,python:`import requests

data = {
    "model": "google/gemini-2.5-flash-image",
    "imageConfig": {
        "aspect_ratio": "16:9",
        "image_size": "4K"
    },
    "messages": [{"role": "user", "content": "Нарисуй рыжего кота в космосе"}]
}
# ... (requests setup)`,php:`<?php
$data = [
    "model" => "google/gemini-2.5-flash-image",
    "imageConfig" => [
        "aspect_ratio" => "16:9",
        "image_size" => "4K"
    ],
    "messages" => [["role" => "user", "content" => "Нарисуй рыжего кота в космосе"]]
];
// ... (curl setup)`,js:`const response = await fetch("https://api.gpt-chat.by/api/chat/completions", {
  method: "POST",
  body: JSON.stringify({
    model: "google/gemini-2.5-flash-image",
    imageConfig: {
        aspect_ratio: "16:9",
        image_size: "4K"
    },
    messages: [{ role: "user", content: "Нарисуй рыжего кота в космосе" }]
  })
});`,response:`{
 "id": "gen-1770668667-OHKN7eKH8d39CobZOa0U",
 "object": "chat.completion",
 "created": 1770668668,
 "usage": {
  "prompt_tokens": 949,
  "completion_tokens": 1493,
  "total_tokens": 2442
 },
 "choices": [
  {
    "logprobs": null,
    "finish_reason": "stop",
    "native_finish_reason": "STOP",
    "index": 0,
    "message": {
      "role": "assistant",
      "content": "Вот изображение человека в этой одежде: ",
      "refusal": null,
      "reasoning": null,
      "annotations": [],
      "images": [
        {
          "type": "image_url",
          "image_url": {
            "url":  "base64 image content"
          },
          "index": 0
        }
      ]
    }
  }
 ],
 "cost": 0.14782708144552498
}`},tools:{curl:`curl https://api.gpt-chat.by/api/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "model": "google/gemini-flash-latest",
    "messages": [{"role": "user", "content": "Какая погода в Минске?"}],
    "tools": [{
      "type": "function",
      "function": {
        "name": "get_weather",
        "parameters": {
          "type": "object",
          "properties": {
            "location": {"type": "string"}
          }
        }
      }
    }]
  }'`,python:`data = {
    "model": "google/gemini-flash-latest",
    "messages": [{"role": "user", "content": "Какая погода в Минске?"}],
    "tools": [{
        "type": "function",
        "function": {
            "name": "get_weather",
            "parameters": {
                "type": "object",
                "properties": {"location": {"type": "string"}}
            }
        }
    }]
}`,php:`<?php
$data = [
    "model" => "google/gemini-flash-latest",
    "messages" => [["role" => "user", "content" => "Какая погода в Минске?"]],
    "tools" => [[
        "type" => "function",
        "function" => [
            "name" => "get_weather",
            "parameters" => [
                "type" => "object",
                "properties" => ["location" => ["type" => "string"]]
            ]
        ]
    ]]
];`,js:`const data = {
  model: "google/gemini-flash-latest",
  messages: [{ role: "user", content: "Какая погода в Минске?" }],
  tools: [{
    type: "function",
    function: {
      name: "get_weather",
      parameters: {
        type: "object",
        properties: { location: { type: "string" } }
      }
    }
  }]
};`,response:`{
  "choices": [{
    "message": {
      "role": "assistant",
      "tool_calls": [{
        "id": "call_123",
        "type": "function",
        "function": {
          "name": "get_weather",
          "arguments": "{\\"location\\": \\"Minsk\\"}"
        }
      }]
    }
  }]
}`}},O=A([{path:"#ai-models",shortTitle:"Каталог моделей",method:"GET",title:"Список моделей и цен",description:`Единственный достоверный источник слагов для параметра model${G(R,": сейчас в каталоге"," чат-моделей")}. Авторизация не нужна. Каталоги по типам генерации лежат на отдельных путях: /api/ai-models/images — генерация и редактирование картинок${G(Y)}, /api/ai-models/videos — видео${G(ne)}, /api/ai-models/audio — озвучка и музыка${G(Oe)}, /api/ai-models/transcribe — распознавание речи. Слаги из разных каталогов не взаимозаменяемы: модель для /chat/video не подойдёт для /chat/completions.`,url:"https://api.gpt-chat.by/api/ai-models",parameters:[],responses:{200:{description:"Массив моделей. price_input / price_output — цена за 1 млн токенов в BYN, price_input_rub / price_output_rub — она же в RUB. В каталогах видео, аудио и транскрибации поле price — цена за секунду, за единицу генерации и за минуту соответственно.",content:[{name:"google/gemma-4",display_name:"Gemma 4",price_input:.31,price_output:1.55,price_input_rub:8.7,price_output_rub:43.5,max_input:1e6,max_output:64e3,context:1e6,color:"blue",input_modalities:["text","image"],output_modalities:["text"]}]}}},{path:"#chat-completions",shortTitle:"Chat completions",method:"POST",title:"Получить ответ от AI модели",description:"Отправляет сообщения в AI модель и возвращает ответ. Совместимо с OpenAI Chat Completions API. Перед вашими сообщениями сервис подставляет свой системный промпт: он просит модель рассуждать по-английски, а отвечать на языке пользователя (по умолчанию — русском), и при enableSearch=true добавляет текущую дату с требованием брать факты из результатов поиска. Этот промпт входит в prompt_tokens (~30 токенов) и не отключается — если нужен другой язык ответа, задайте его своим сообщением с role=system или прямо в тексте запроса.",url:"https://api.gpt-chat.by/api/chat/completions",in:"json/body",parameters:[{name:"messages",description:"Массив сообщений, формирующих диалог. Поддерживает текст, изображения и вызов инструментов.",required:!0,default:"",schema:{type:"array"}},{name:"model",description:"Слаг модели AI (например, google/gemma-4, anthropic/claude-opus-latest, openai/gpt-5.6-sol). Полный список слагов — на /pricing или через GET /api/ai-models.",required:!1,default:"google/gemma-4",schema:{type:"string"}},{name:"collectionId",description:"Идентификатор коллекции RAG для использования ваших документов",required:!1,default:"",schema:{type:"uuid"}},{name:"temperature",description:"Температура генерации (0.1 — 1.0)",required:!1,default:"0.1",schema:{type:"number"}},{name:"stream",description:"Использовать потоковую передачу данных. Ответ идёт как text/event-stream: строки «data: {чанк}», последний чанк несёт usage, поток закрывается строкой «data: [DONE]»",required:!1,default:"false",schema:{type:"boolean"}},{name:"thinking",description:"Включить режим глубоких размышлений (для поддерживаемых моделей)",required:!1,default:"false",schema:{type:"boolean"}},{name:"enableSearch",description:"Включить поиск в интернете. Отвечает выбранная модель: Claude, DeepSeek и Qwen сами ищут до 5 раз за запрос, остальные — один поиск перед ответом",required:!1,default:"false",schema:{type:"boolean"}},{name:"searchOptions",description:"Настройки веб-поиска: max_results (1–10, по умолчанию 10), engine (native | exa | parallel | perplexity — по умолчанию у Claude native, собственный поиск Anthropic, у остальных perplexity: ищет поисковый API, а отвечает выбранная вами модель), search_prompt (только для моделей с одним поиском)",required:!1,default:"null",schema:{type:"object"}},{name:"assistantId",description:"Идентификатор вашего кастомного ассистента (персоны) — подставляет его системный промпт",required:!1,default:null,schema:{type:"uuid"}},{name:"useMemory",description:"Использовать долговременную память пользователя и сохранённые инструкции в контексте ответа",required:!1,default:"true",schema:{type:"boolean"}},{name:"imageConfig",description:"Настройки выходной картинки для chat-capable image-моделей. Объект с полями aspect_ratio (1:1, 2:3, 3:2, 3:4, 4:3, 4:5, 5:4, 9:16, 16:9, 21:9) и image_size (0.5K, 1K, 2K, 4K). modalities выставляются автоматически по модели.",required:!1,default:null,schema:{type:"object"}},{name:"tools",description:"Список инструментов (функций), которые может вызывать модель",required:!1,default:null,schema:{type:"array"}}],responses:{200:{description:"Успешный ответ от AI модели",content:{id:"chatcmpl-9d9aacd0-b2e2-9f4c-a267-2a43e3ad3bd8",object:"chat.completion",created:1754499895,model:"google/gemma-4",usage:{prompt_tokens:384,completion_tokens:552,total_tokens:936,cost:4536e-7,cost_byn:.001376,prompt_tokens_details:{cached_tokens:7}},choices:[{message:{role:"assistant",content:"Если ты хочешь что то узнать — просто скажи! 😺"},finish_reason:"stop",index:0,logprobs:null}]}},400:{description:"Некорректный запрос"},401:{description:"Не авторизован"},402:{description:"Недостаточно средств на балансе"},500:{description:"Внутренняя ошибка сервера"}}},{path:"#chat-image-generate",shortTitle:"Сгенерировать изображение",method:"POST",title:"Генерация изображения по промпту",description:"Стоимость зависит от выбранной модели (обычно ~$0.04–0.20 за изображение). Списывается с баланса.",url:"https://api.gpt-chat.by/api/chat/image",in:"json/body",parameters:[{name:"prompt",description:"Текстовое описание желаемого изображения (1—2000 символов)",required:!0,schema:{type:"string"}},{name:"model",description:"Слаг image-модели: google/gemini-2.5-flash-image, google/gemini-3-flash-image, google/gemini-3.1-flash-image-preview, openai/gpt-5.4-image-2 и др.",required:!1,default:"google/gemini-2.5-flash-image",schema:{type:"string"}},{name:"aspectRatio",description:"Соотношение сторон: 1:1, 2:3, 3:2, 3:4, 4:3, 4:5, 5:4, 9:16, 16:9, 21:9. Если не указано — решает модель.",required:!1,default:null,schema:{type:"string"}},{name:"imageSize",description:"Разрешение: 1K, 2K, 4K. Зависит от модели (для google/gemini-2.5-flash-image доступно только 1K).",required:!1,default:null,schema:{type:"string"}}],responses:{200:{description:"Изображение сгенерировано",content:{image:"data:image/jpeg;base64,/9j/4AAQSkZJRg...",balance:12.34,isFree:!1}},400:{description:"Некорректный запрос"},401:{description:"Не авторизован"},402:{description:"Недостаточно средств на балансе"},500:{description:"Внутренняя ошибка сервера"}}},{path:"#chat-image-edit",shortTitle:"Отредактировать изображение",method:"POST",title:"Редактирование изображения по промпту",description:"Принимает одно (image) или несколько (images[], до 3) исходных изображений и текстовое описание правки. Стоимость ~$0.11.",url:"https://api.gpt-chat.by/api/chat/image/edit",in:"multipart/form-data",parameters:[{name:"prompt",description:"Описание правки (5—600 символов)",required:!0,schema:{type:"string"}},{name:"image",description:"Одно исходное изображение (JPG, PNG, WebP), максимум 10 МБ",required:!0,required_variant:!0,schema:{type:"file"}},{name:"images[]",description:"Несколько исходных изображений (JPG, PNG, WebP), до 5 файлов, каждый ≤10 МБ, вместе ≤30 МБ. Используйте вместо image для мультиизображений.",required:!0,required_variant:!0,schema:{type:"file[]"}},{name:"model",description:"Слаг image-модели для редактирования",required:!1,default:"google/gemini-2.5-flash-image",schema:{type:"string"}}],responses:{200:{description:"Изображение успешно отредактировано",content:{image:"data:image/jpeg;base64,/9j/4AAQSkZJRg...",balance:12.23,isFree:!1}},400:{description:"Некорректный запрос (формат, размер, длина prompt)"},401:{description:"Не авторизован"},402:{description:"Недостаточно средств на балансе"},500:{description:"Внутренняя ошибка сервера"}}},{path:"#chat-video-generate",shortTitle:"Сгенерировать видео",method:"POST",title:"Генерация видео из текста (асинхронно)",description:"Возвращает taskId для поллинга через GET /api/chat/video/status/{taskId}. Длительность, разрешение и стоимость зависят от выбранной модели.",url:"https://api.gpt-chat.by/api/chat/video",in:"json/body",parameters:[{name:"prompt",description:"Текстовое описание видео (1—2000 символов)",required:!0,schema:{type:"string"}},{name:"model",description:"Слаг видео-модели: alibaba/wan-2.6, alibaba/wan-2.7, google/veo-3.1, google/veo-3.1-fast, bytedance/seedance-1-5-pro, bytedance/seedance-2.0, bytedance/seedance-2.0-fast, black-forest-labs/flux-3-video, openai/sora-2-pro, kwaivgi/kling-v3.0-pro, kwaivgi/kling-v3.0-std, x-ai/grok-imagine-video.",required:!1,default:"alibaba/wan-2.6",schema:{type:"string"}},{name:"resolution",description:"Разрешение: 480p, 720p, 1080p. Набор зависит от модели; если не указано — берётся дефолт модели.",required:!1,default:null,schema:{type:"string"}},{name:"duration",description:"Длительность в секундах. Допустимые значения зависят от модели; если не указано — дефолт модели.",required:!1,default:null,schema:{type:"integer"}}],responses:{200:{description:"Задача поставлена в очередь",content:{taskId:"b3a1c0d2-3e4f-5a6b-7c8d-9e0f1a2b3c4d",status:"pending"}},401:{description:"Не авторизован"},402:{description:"Недостаточно средств"},500:{description:"Внутренняя ошибка сервера"}}},{path:"#chat-video-from-image",shortTitle:"Видео из изображения",method:"POST",title:"Генерация видео из изображения (асинхронно)",description:"Принимает исходное изображение и описание движения. Возвращает taskId для поллинга. Стоимость зависит от выбранной модели.",url:"https://api.gpt-chat.by/api/chat/video/image",in:"multipart/form-data",parameters:[{name:"image",description:"Исходный файл (JPG, PNG, WebP), максимум 10 МБ",required:!0,schema:{type:"file"}},{name:"prompt",description:"Описание желаемого движения/анимации (5—600 символов)",required:!0,schema:{type:"string"}},{name:"model",description:"Слаг видео-модели с поддержкой image-to-video: alibaba/wan-2.6, alibaba/wan-2.7, google/veo-3.1, google/veo-3.1-fast, bytedance/seedance-1-5-pro, bytedance/seedance-2.0, black-forest-labs/flux-3-video, openai/sora-2-pro, kwaivgi/kling-v3.0-pro и др.",required:!1,default:"alibaba/wan-2.6",schema:{type:"string"}},{name:"resolution",description:"Разрешение: 480p, 720p, 1080p. Набор зависит от модели; если не указано — дефолт модели.",required:!1,default:null,schema:{type:"string"}},{name:"duration",description:"Длительность в секундах. Допустимые значения зависят от модели; если не указано — дефолт модели.",required:!1,default:null,schema:{type:"integer"}}],responses:{200:{description:"Задача поставлена в очередь",content:{taskId:"b3a1c0d2-3e4f-5a6b-7c8d-9e0f1a2b3c4d",status:"pending"}},400:{description:"Некорректный запрос (формат, размер, длина prompt)"},401:{description:"Не авторизован"},402:{description:"Недостаточно средств"},500:{description:"Внутренняя ошибка сервера"}}},{path:"#chat-video-status",shortTitle:"Статус видео-задачи",method:"GET",title:"Получить статус генерации видео",description:'Поллинг задачи. Когда status="done", в первом ответе вернётся HTTPS-ссылка на mp4 и обновлённый баланс. Дальше задача считается доставленной.',url:"https://api.gpt-chat.by/api/chat/video/status/{taskId}",in:"path/string",parameters:[{name:"taskId",in:"path",description:"Идентификатор задачи, полученный при вызове /chat/video или /chat/video/image",required:!0,schema:{type:"string"}}],responses:{200:{description:"Готово (первая успешная доставка)",content:{status:"done",video:"https://s3.example/video/vid-123.mp4",balance:11.83}},202:{description:"В процессе (продолжайте поллинг)",content:{status:"pending"}},403:{description:"Задача принадлежит другому пользователю"},404:{description:"Задача не найдена или истёк срок хранения (1 час)"},500:{description:"Внутренняя ошибка сервера"}}},{path:"#chat-voice-transcribe",shortTitle:"Распознать речь",method:"POST",title:"Распознавание речи (Speech-to-Text)",description:"Принимает короткое аудио (≤1 МБ, ~60 секунд). Rate-limited.",url:"https://api.gpt-chat.by/api/chat/voice/transcribe",in:"multipart/form-data",parameters:[{name:"voice",description:"Аудиофайл (webm, ogg, mp3, wav, mp4, m4a), максимум 1 МБ",required:!0,schema:{type:"file"}}],responses:{200:{description:"Распознанный текст",content:{text:"Привет, как дела?"}},400:{description:"Некорректный файл, неподдерживаемый формат или речь не распознана"},401:{description:"Не авторизован"},429:{description:"Слишком много запросов подряд"}}},{path:"#chat-audio-generate",shortTitle:"Сгенерировать аудио",method:"POST",title:"Генерация аудио (Text-to-Speech)",description:"Озвучивает текст или генерирует аудио по описанию. Возвращает аудио как data-URL и ссылку на файл, а также транскрипт. Списывает баланс согласно длительности и модели.",url:"https://api.gpt-chat.by/api/chat/audio",in:"json/body",parameters:[{name:"prompt",description:"Текст для озвучивания или описание для генерации аудио (от 1 до 4000 символов)",required:!0,schema:{type:"string"}},{name:"model",description:"Модель озвучки: openai/gpt-audio-mini, openai/gpt-audio, google/gemini-3.1-flash-tts-preview, hexgrad/kokoro-82m, mistralai/voxtral-mini-tts-2603; музыка: google/lyria-3-*",required:!1,default:"openai/gpt-audio-mini",schema:{type:"string"}},{name:"voice",description:"Голос озвучивания для моделей OpenAI: alloy, ash, ballad, coral, echo, fable, onyx, nova, sage, shimmer, verse. Если не указан — используется alloy",required:!1,default:"alloy",schema:{type:"string"}},{name:"duration",description:"Длительность аудио в секундах (до 300; для каждой модели свой максимум)",required:!1,default:"30",schema:{type:"number"}},{name:"format",description:"Формат выходного аудио: mp3, wav, opus, flac",required:!1,default:"mp3",schema:{type:"string"}},{name:"imageUrl",description:"Ссылка на изображение-референс (поддерживается только моделями Google Lyria)",required:!1,schema:{type:"url"}}],responses:{200:{description:"Аудио успешно сгенерировано",content:{audio:"data:audio/mpeg;base64,SUQzBAAA...",url:"https://api.gpt-chat.by/uploads/audio/019883b7-146e-713f-a102-25428208a460.mp3",transcript:"Привет, как дела?",balance:12.34,isFree:!1}},400:{description:"Некорректный запрос или неизвестная модель"},401:{description:"Не авторизован"},402:{description:"Недостаточно средств"},500:{description:"Внутренняя ошибка сервера"}}},{path:"#chat-file-extract",shortTitle:"Извлечь текст из файла",method:"POST",title:"Извлечение текста из документа",description:"Принимает документ и возвращает извлечённый текст. Текст обрезается до 200 000 символов.",url:"https://api.gpt-chat.by/api/chat/file/extract",in:"multipart/form-data",parameters:[{name:"file",description:`Документ: ${Ae.join(", ")}. Максимум 50 МБ`,required:!0,schema:{type:"file"}}],responses:{200:{description:"Текст извлечён",content:{filename:"report.pdf",extension:"pdf",sizeBytes:524288,text:"Содержимое документа...",charCount:12345,isTruncated:!1}},400:{description:"Некорректный файл, неподдерживаемое расширение или ошибка извлечения"},401:{description:"Не авторизован"}}},{path:"#rag-collections-create",shortTitle:"RAG: создать коллекцию",method:"POST",title:"Создать коллекцию RAG",description:"Создаёт новую коллекцию — папку раздела «Мои файлы», по документам которой модель будет отвечать (дообучения модели не происходит)",url:"https://api.gpt-chat.by/api/rag/collections",in:"json/body",parameters:[{name:"name",description:"Название коллекции",required:!0,schema:{type:"string"}}],responses:{201:{description:"Коллекция успешно создана",content:{documents:[],id:"019883b7-146e-713f-a102-25428208a460",name:"Default Collection"}},400:{description:"Некорректный запрос"},401:{description:"Не авторизован"},500:{description:"Внутренняя ошибка сервера"}}},{path:"#rag-collections-list",shortTitle:"RAG: список коллекций",method:"GET",title:"Получить список коллекций RAG",description:"Возвращает список всех коллекций текущего пользователя",url:"https://api.gpt-chat.by/api/rag/collections",in:"",parameters:[],responses:{200:{description:"Список коллекций",content:[{documents:[{id:"01988413-2557-7228-af02-6c3b8aae4635",name:"https://testy.com/",size:"83",type:"html"}],id:"019883b7-146e-713f-a102-25428208a460",name:"Default Collection"},{documents:[],id:"019883b7-146e-713f-a102-25428208a460",name:"Default Collection 2"},{documents:[],id:"019883b7-146e-713f-a102-25428208a460",name:"Default Collection 3"}]},401:{description:"Неавторизован"}}},{path:"#rag-collections-item",shortTitle:"RAG: получить коллекцию",method:"GET",title:"Получить информацию о коллекции RAG",description:"Возвращает информацию о конкретной коллекции",url:"https://api.gpt-chat.by/api/rag/collections/{collectionId}",in:"path/string",parameters:[{name:"collectionId",required:!0,schema:{type:"uuid"},description:"Идентификатор коллекции"}],responses:{200:{description:"Информация о коллекции",content:{documents:[{id:"01988413-2557-7228-af02-6c3b8aae4635",name:"https://testy.com/",size:"83",type:"html"}],id:"019883b7-146e-713f-a102-25428208a460",name:"Default Collection"}},401:{description:"Неавторизован"},404:{description:"Коллекция не найдена"}}},{path:"#rag-collections-update",shortTitle:"RAG: изменить коллекцию",method:"PUT",title:"Изменить коллекцию RAG",description:"Обновляет название коллекции и, при необходимости, привязывает Telegram-бота",url:"https://api.gpt-chat.by/api/rag/collections/{collectionId}",in:"json/body + path/string",parameters:[{name:"collectionId",in:"path",required:!0,schema:{type:"uuid"},description:"Идентификатор коллекции"},{name:"name",in:"body",required:!1,schema:{type:"string"},description:"Новое название коллекции"},{name:"telegramToken",in:"body",required:!1,schema:{type:"string"},description:"Токен Telegram-бота вида <bot_id>:<token> для отправки уведомлений"}],responses:{200:{description:"Коллекция успешно обновлена",content:{id:"019883b7-146e-713f-a102-25428208a460",name:"Support FAQ collection",telegramBotName:"SupportHelperBot",documents:[]}},400:{description:"Некорректный запрос"},401:{description:"Неавторизован"},404:{description:"Коллекция не найдена"},500:{description:"Внутренняя ошибка сервера"}}},{path:"#rag-collections-delete",shortTitle:"RAG: удалить коллекцию",method:"DELETE",title:"Удалить коллекцию RAG",description:"Удаляет коллекцию и все связанные с ней документы",url:"https://api.gpt-chat.by/api/rag/collections/{collectionId}",in:"path/string",parameters:[{name:"collectionId",required:!0,schema:{type:"uuid"},description:"Идентификатор коллекции"}],responses:{204:{description:"Коллекция успешно удалена"},401:{description:"Неавторизован"},404:{description:"Коллекция не найдена"},500:{description:"Внутренняя ошибка сервера"}}},{path:"#rag-collections-documents-create",shortTitle:"RAG: загрузить документ",method:"POST",title:"Загрузить документ в коллекцию RAG",description:"Добавляет новый документ в указанную коллекцию",url:"https://api.gpt-chat.by/api/rag/collections/{collectionId}/documents",in:"multipart/form-data + path/string",parameters:[{name:"collectionId",in:"path",required:!0,schema:{type:"uuid"},description:"Идентификатор коллекции"},{name:"url",required:!0,required_variant:!0,schema:{type:"url"},description:"Ссылка на интернет ресурс (имя документа берётся из URL)"},{name:"file",required:!0,required_variant:!0,schema:{type:"file"},description:`Файл: ${Ae.join(", ")}. Максимум 50 MB (имя документа берётся из имени файла)`}],responses:{201:{description:"Документ успешно добавлен",content:{id:"01988413-2557-7228-af02-6c3b8aae4635"}},400:{description:"Некорректный запрос"},401:{description:"Неавторизован"},404:{description:"Коллекция не найдена"},500:{description:"Внутренняя ошибка сервера"}}},{path:"#rag-collections-documents-delete",shortTitle:"RAG: удалить документ",method:"DELETE",title:"Удалить документ из коллекции RAG",description:"Удаляет конкретный документ из коллекции",url:"https://api.gpt-chat.by/api/rag/collections/{collectionId}/documents/{documentId}",in:"json/body + path/string",parameters:[{name:"collectionId",in:"path",required:!0,schema:{type:"uuid"},description:"Идентификатор коллекции"},{name:"documentId",in:"path",required:!0,schema:{type:"uuid"},description:"Идентификатор документа"}],responses:{204:{description:"Документ успешно удален"},401:{description:"Неавторизован"},404:{description:"Документ не найден"},500:{description:"Внутренняя ошибка сервера"}}},{path:"#assistants-list",shortTitle:"Ассистенты: список",method:"GET",title:"Список ваших ассистентов",description:"Возвращает ассистентов (персон) аккаунта. Поле id отсюда подставляется в параметр assistantId у POST /api/chat/completions.",url:"https://api.gpt-chat.by/api/assistants",parameters:[],responses:{200:{description:"Массив ассистентов",content:[{id:"01a04c4c-ebc3-7020-b1d7-715201657276",name:"Юрист",description:"Отвечает языком договоров",systemPrompt:"Ты — юрист. Отвечай сухо и со ссылками на нормы.",model:"anthropic/claude-sonnet-latest",icon:"mdi-scale-balance"}]},401:{description:"Не авторизован"}}},{path:"#assistants-create",shortTitle:"Ассистенты: создать",method:"POST",title:"Создать ассистента",description:"Создаёт персону с собственным системным промптом.",url:"https://api.gpt-chat.by/api/assistants",in:"json/body",parameters:[{name:"name",description:"Название ассистента",required:!0,default:"",schema:{type:"string"}},{name:"systemPrompt",description:"Системный промпт персоны",required:!0,default:"",schema:{type:"string"}},{name:"description",description:"Короткое описание",required:!1,default:null,schema:{type:"string"}},{name:"model",description:"Модель по умолчанию (слаг из GET /api/ai-models)",required:!1,default:null,schema:{type:"string"}},{name:"icon",description:"Имя иконки для интерфейса",required:!1,default:null,schema:{type:"string"}}],responses:{201:{description:"Ассистент создан",content:{id:"01a04c4c-ebc3-7020-b1d7-715201657276",name:"Юрист"}},401:{description:"Не авторизован"}}},{path:"#assistants-update",shortTitle:"Ассистенты: изменить",method:"PUT",title:"Изменить ассистента",description:"Полностью перезаписывает поля ассистента. Чужой id даёт 404.",url:"https://api.gpt-chat.by/api/assistants/{assistantId}",in:"json/body + path/string",parameters:[{name:"assistantId",in:"path",description:"Идентификатор ассистента",required:!0,schema:{type:"uuid"}},{name:"name",description:"Название ассистента",required:!0,default:"",schema:{type:"string"}},{name:"systemPrompt",description:"Системный промпт персоны",required:!0,default:"",schema:{type:"string"}}],responses:{200:{description:"Ассистент обновлён"},401:{description:"Не авторизован"},404:{description:"Ассистент не найден"}}},{path:"#assistants-delete",shortTitle:"Ассистенты: удалить",method:"DELETE",title:"Удалить ассистента",description:"Удаляет персону аккаунта.",url:"https://api.gpt-chat.by/api/assistants/{assistantId}",in:"path/string",parameters:[{name:"assistantId",in:"path",description:"Идентификатор ассистента",required:!0,schema:{type:"uuid"}}],responses:{204:{description:"Ассистент удалён"},401:{description:"Не авторизован"},404:{description:"Ассистент не найден"}}},{path:"#memory-list",shortTitle:"Память: список",method:"GET",title:"Долговременная память аккаунта",description:"Факты и инструкции, которые подмешиваются в контекст при useMemory=true в POST /api/chat/completions.",url:"https://api.gpt-chat.by/api/profile/memory",parameters:[],responses:{200:{description:"Массив записей памяти",content:[{id:"01a04c4c-ebc3-7020-b1d7-715201657276",content:"Обращаться на «ты»"}]},401:{description:"Не авторизован"}}},{path:"#memory-create",shortTitle:"Память: добавить",method:"POST",title:"Добавить запись в память",description:"Добавляет факт или инструкцию в долговременную память аккаунта.",url:"https://api.gpt-chat.by/api/profile/memory",in:"json/body",parameters:[{name:"content",description:"Текст записи",required:!0,default:"",schema:{type:"string"}}],responses:{201:{description:"Запись создана",content:{id:"01a04c4c-ebc3-7020-b1d7-715201657276",content:"Обращаться на «ты»"}},401:{description:"Не авторизован"}}},{path:"#memory-delete",shortTitle:"Память: удалить",method:"DELETE",title:"Удалить запись памяти",description:"Удаляет одну запись долговременной памяти.",url:"https://api.gpt-chat.by/api/profile/memory/{memoryId}",in:"path/string",parameters:[{name:"memoryId",in:"path",description:"Идентификатор записи",required:!0,schema:{type:"uuid"}}],responses:{204:{description:"Запись удалена"},401:{description:"Не авторизован"},404:{description:"Запись не найдена"}}}]),V=n=>({GET:"success",POST:"info",PUT:"warning",DELETE:"error",PATCH:"primary"})[n]||"default",he=n=>n.startsWith("2")?"success":n.startsWith("4")?"warning":n.startsWith("5")?"error":"default",fe=n=>{const e=document.getElementById(n.replace("#",""));e&&e.scrollIntoView({behavior:"smooth",block:"start"})},b=async(n,e)=>{try{await navigator.clipboard.writeText(n),f.value=e,setTimeout(()=>{f.value===e&&(f.value=null)},1500)}catch(d){console.error("Clipboard error",d)}},J=()=>{let e=null;for(const d of O.value){const c=document.getElementById(d.path.replace("#",""));if(!c)continue;c.getBoundingClientRect().top-120<=0&&(e=d.path)}oe.value=e},U={props:["examples","tabKey","activeLang","copiedKey"],emits:["update:activeLang","copy"],setup(n,{emit:e}){const d=[{value:"curl",label:"cURL"},{value:"python",label:"Python"},{value:"php",label:"PHP"},{value:"js",label:"JS"}];return()=>z("div",[z("div",{class:"d-flex flex-wrap mb-2",style:"gap: 4px;"},d.map(c=>z(p("v-btn"),{size:"small",variant:n.activeLang===c.value?"tonal":"text",color:n.activeLang===c.value?"primary":void 0,onClick:()=>e("update:activeLang",c.value)},()=>c.label))),z("div",{class:"code-block position-relative"},[z(p("v-btn"),{class:"copy-btn",size:"x-small",variant:"text",icon:"mdi-content-copy",title:n.copiedKey===`${n.tabKey}-${n.activeLang}`?"Скопировано":"Скопировать",onClick:()=>e("copy",n.examples[n.activeLang],`${n.tabKey}-${n.activeLang}`)}),z("pre",n.examples[n.activeLang])])])}};return Ze(()=>{window.addEventListener("scroll",J,{passive:!0}),J()}),Xe(()=>{window.removeEventListener("scroll",J)}),(n,e)=>{const d=p("v-icon"),c=p("v-card-text"),T=p("v-card"),F=p("v-col"),ye=p("v-row"),ve=p("v-expansion-panel-title"),y=p("v-chip"),be=p("v-list-item"),_e=p("v-list"),xe=p("v-expansion-panel-text"),ke=p("v-expansion-panel"),Te=p("v-expansion-panels"),Be=p("v-avatar"),w=p("v-btn"),E=p("v-card-title"),Q=He,C=p("v-alert"),we=p("v-table"),N=p("v-tab"),Ke=p("v-tabs"),B=p("v-window-item"),Ye=p("v-window"),Me=p("v-spacer"),De=p("v-container");return l(),u(De,{fluid:"",class:"pa-4 pa-md-6 doc-api-page"},{default:s(()=>[i(ye,null,{default:s(()=>[i(F,{cols:"12",md:"9",lg:"9"},{default:s(()=>[e[67]||(e[67]=t("div",{class:"mb-6"},[t("h1",{class:"text-h4 text-md-h3 font-weight-bold mb-2"}," API нейросетей с оплатой в BYN "),t("p",{class:"text-body-1 text-medium-emphasis"}," GPT, Claude, Gemini, DeepSeek и другие модели через один ключ. Формат OpenAI Chat Completions: подключаются официальные библиотеки OpenAI. Ниже — быстрый старт и полная документация. ")],-1)),i(ye,{class:"mb-6",dense:""},{default:s(()=>[(l(!0),g(_,null,x(Ue.value,a=>(l(),u(F,{key:a.title,cols:"12",sm:"6"},{default:s(()=>[i(T,{variant:"outlined",class:"h-100"},{default:s(()=>[i(c,{class:"d-flex ga-3"},{default:s(()=>[i(d,{icon:a.icon,color:"primary",class:"flex-shrink-0"},null,8,["icon"]),t("div",null,[t("div",tt,r(a.title),1),t("div",at,r(a.text),1)])]),_:2},1024)]),_:2},1024)]),_:2},1024))),128))]),_:1}),Z(ee)?(l(),u(Te,{key:0,class:"mb-6"},{default:s(()=>[i(ke,null,{default:s(()=>[i(ve,null,{default:s(()=>[i(d,{icon:"mdi-format-list-bulleted",class:"me-2"}),o(" Содержание ("+r(O.value.length)+" эндпоинтов) ",1)]),_:1}),i(xe,null,{default:s(()=>[i(_e,{density:"compact",class:"pa-0"},{default:s(()=>[(l(!0),g(_,null,x(O.value,a=>(l(),u(be,{key:a.path,title:a.shortTitle,onClick:m=>fe(a.path)},{prepend:s(()=>[i(y,{color:V(a.method),size:"x-small",variant:"flat",label:"",class:"me-2 method-chip"},{default:s(()=>[o(r(a.method),1)]),_:2},1032,["color"])]),_:2},1032,["title","onClick"]))),128))]),_:1})]),_:1})]),_:1})]),_:1})):q("",!0),i(T,{color:"primary",variant:"flat",class:"mb-6 keys-cta",rounded:"lg"},{default:s(()=>[i(c,{class:"pa-5 pa-md-6"},{default:s(()=>[t("div",it,[i(Be,{color:"white",size:"56",class:"flex-shrink-0"},{default:s(()=>[i(d,{icon:"mdi-key-plus",color:"primary",size:"32"})]),_:1}),e[15]||(e[15]=t("div",{class:"flex-grow-1"},[t("div",{class:"text-h6 font-weight-bold text-white mb-1"}," Начните с создания API ключа "),t("div",{class:"text-body-2 text-white",style:{opacity:"0.9"}},[o(" Все запросы авторизуются Bearer-токеном. Сгенерируйте ключ в личном кабинете и подставьте его в заголовок "),t("code",{class:"cta-code"},"Authorization"),o(". ")])],-1)),t("div",st,[ze.value?(l(),u(w,{key:0,to:"/keys/",color:"white",variant:"flat",size:"large","prepend-icon":"mdi-key-plus",class:"text-primary font-weight-bold"},{default:s(()=>[...e[13]||(e[13]=[o(" Создать ключ ",-1)])]),_:1})):(l(),u(w,{key:1,to:"/keys/",color:"white",variant:"flat",size:"large","prepend-icon":"mdi-login",class:"text-primary font-weight-bold"},{default:s(()=>[...e[14]||(e[14]=[o(" Войти и создать ключ ",-1)])]),_:1}))])])]),_:1})]),_:1}),i(T,{id:"quick-start",variant:"outlined",class:"mb-6"},{default:s(()=>[i(E,{class:"text-h5 font-weight-bold"},{default:s(()=>[i(d,{icon:"mdi-rocket-launch-outline",color:"primary",class:"me-2"}),e[16]||(e[16]=o(" Подключение за минуту ",-1))]),_:1}),i(c,null,{default:s(()=>[t("p",ot,[e[18]||(e[18]=o(" Если код уже работает с OpenAI, поменяйте две строки: ключ и ",-1)),e[19]||(e[19]=t("code",null,"base_url",-1)),e[20]||(e[20]=o(" = ",-1)),t("code",null,r(X)),e[21]||(e[21]=o(". Слаги моделей и цены — в ",-1)),i(Q,{to:"/pricing/",class:"text-primary font-weight-medium"},{default:s(()=>[...e[17]||(e[17]=[o(" списке моделей ",-1)])]),_:1}),e[22]||(e[22]=o(" или в ответе ",-1)),e[23]||(e[23]=t("code",null,"GET /api/ai-models",-1)),e[24]||(e[24]=o(". ",-1))]),t("div",nt,[(l(),g(_,null,x(Le,a=>i(w,{key:a.value,size:"small",variant:I.value===a.value?"tonal":"text",color:I.value===a.value?"primary":void 0,onClick:m=>I.value=a.value},{default:s(()=>[o(r(a.label),1)]),_:2},1032,["variant","color","onClick"])),64))]),t("div",lt,[i(w,{class:"copy-btn",size:"x-small",variant:"text",icon:"mdi-content-copy",title:f.value===`sdk-${I.value}`?"Скопировано":"Скопировать",onClick:e[0]||(e[0]=a=>b(ue.value[I.value],`sdk-${I.value}`))},null,8,["title"]),t("pre",null,r(ue.value[I.value]),1)]),i(C,{type:"info",variant:"tonal",density:"compact"},{default:s(()=>[...e[25]||(e[25]=[o(" В потоке (",-1),t("code",null,"stream",-1),o(") последний кусок служебный и может прийти с пустым ",-1),t("code",null,"choices",-1),o(". Поэтому в примере стоит проверка ",-1),t("code",null,"if chunk.choices",-1),o(" — без неё обращение к ",-1),t("code",null,"choices[0]",-1),o(" упадёт. ",-1)])]),_:1})]),_:1})]),_:1}),i(T,{id:"limits",variant:"outlined",class:"mb-6"},{default:s(()=>[i(E,{class:"text-h5 font-weight-bold"},{default:s(()=>[i(d,{icon:"mdi-speedometer",color:"primary",class:"me-2"}),e[26]||(e[26]=o(" Лимиты и расходы ",-1))]),_:1}),i(c,null,{default:s(()=>[t("ul",rt,[t("li",null,[e[28]||(e[28]=t("strong",null,"Частота.",-1)),e[29]||(e[29]=o(" У запросов к чату с ключом нет отдельного лимита в минуту. Потолок задают баланс и «Лимит расходов»: его можно поставить каждому ключу в разделе ",-1)),i(Q,{to:"/keys/",class:"text-primary font-weight-medium"},{default:s(()=>[...e[27]||(e[27]=[o(" API Ключи ",-1)])]),_:1}),e[30]||(e[30]=o(" при создании ключа. ",-1))]),e[32]||(e[32]=t("li",null,[t("strong",null,"Ошибка 429"),o(" бывает только у распознавания речи и презентаций (2 запроса в минуту) и у разбора брендбука (2 запроса за 5 минут). ")],-1)),e[33]||(e[33]=t("li",null,[t("strong",null,"Деньги."),o(" Списание — с общего баланса в BYN по факту, подписки нет. Стоимость каждого ответа приходит в "),t("code",null,"usage.cost_byn"),o(". Если баланса не хватает на оценку запроса — ошибка 402. ")],-1)),t("li",null,[e[31]||(e[31]=t("strong",null,"Пополнение",-1)),o(" — от "+r(Z(W))+" BYN картой БЕЛКАРТ, Visa, Mastercard или МИР. ",1)])])]),_:1})]),_:1}),i(T,{variant:"outlined",class:"mb-6"},{default:s(()=>[i(E,{class:"text-h5 font-weight-bold"},{default:s(()=>[i(d,{icon:"mdi-key-outline",color:"primary",class:"me-2"}),e[34]||(e[34]=o(" Авторизация ",-1))]),_:1}),i(c,null,{default:s(()=>[t("p",pt,[e[36]||(e[36]=o(" Все запросы используют Bearer-токен. Управление ключами — на странице ",-1)),i(Q,{to:"/keys/",class:"text-primary font-weight-medium"},{default:s(()=>[...e[35]||(e[35]=[o(" API Ключи ",-1)])]),_:1}),e[37]||(e[37]=o(". ",-1))]),t("div",dt,[i(w,{class:"copy-btn",size:"x-small",variant:"text",icon:"mdi-content-copy",title:f.value==="auth"?"Скопировано":"Скопировать",onClick:e[1]||(e[1]=a=>b("Authorization: Bearer YOUR_API_KEY","auth"))},null,8,["title"]),e[38]||(e[38]=t("pre",null,"Authorization: Bearer YOUR_API_KEY",-1))])]),_:1})]),_:1}),i(T,{variant:"outlined",class:"mb-6"},{default:s(()=>[i(E,{class:"text-h5 font-weight-bold"},{default:s(()=>[i(d,{icon:"mdi-alert-circle-outline",color:"primary",class:"me-2"}),e[39]||(e[39]=o(" Формат ошибок ",-1))]),_:1}),i(c,null,{default:s(()=>[e[42]||(e[42]=t("p",{class:"text-body-1 mb-3"},[o(" Все ошибки приходят одним объектом с полем "),t("code",null,"message"),o(" — его достаточно, чтобы показать человеку причину. Если ошибка относится к конкретным полям запроса, рядом лежит "),t("code",null,"errors"),o(" с разбивкой. ")],-1)),t("div",ct,[i(w,{class:"copy-btn",size:"x-small",variant:"text",icon:"mdi-content-copy",title:f.value==="err"?"Скопировано":"Скопировать",onClick:e[2]||(e[2]=a=>b(Ie,"err"))},null,8,["title"]),t("pre",null,r(Ie))]),i(we,{density:"compact",class:"mb-2"},{default:s(()=>[e[40]||(e[40]=t("thead",null,[t("tr",null,[t("th",null,"Код"),t("th",null,"Когда")])],-1)),t("tbody",null,[(l(),g(_,null,x(Ee,a=>t("tr",{key:a.code},[t("td",null,[i(y,{color:he(String(a.code)),size:"x-small",variant:"flat",label:""},{default:s(()=>[o(r(a.code),1)]),_:2},1032,["color"])]),t("td",null,r(a.when),1)])),64))])]),_:1}),i(C,{type:"info",variant:"tonal",density:"compact"},{default:s(()=>[...e[41]||(e[41]=[o(" Любая проблема с телом запроса — неизвестный слаг модели, пустой промпт, неверный формат файла — это ",-1),t("strong",null,"400",-1),o(". Отдельного кода 422 у API больше нет. ",-1)])]),_:1})]),_:1})]),_:1}),i(T,{variant:"outlined",class:"mb-6"},{default:s(()=>[i(E,{class:"text-h5 font-weight-bold"},{default:s(()=>[i(d,{icon:"mdi-message-text-outline",color:"primary",class:"me-2"}),e[43]||(e[43]=o(" Формирование сообщений ",-1))]),_:1}),i(c,null,{default:s(()=>[e[61]||(e[61]=t("p",{class:"text-body-1 mb-4"},[o(" Запросы строятся на основе массива "),t("code",null,"messages"),o(". Каждое сообщение имеет "),t("code",null,"role"),o(" (system/user/assistant) и "),t("code",null,"content"),o(". ")],-1)),i(Ke,{modelValue:$.value,"onUpdate:modelValue":e[3]||(e[3]=a=>$.value=a),color:"primary","show-arrows":"",class:"swipe-hint"},{default:s(()=>[i(N,{value:"text"},{default:s(()=>[...e[44]||(e[44]=[o(" Текст ",-1)])]),_:1}),i(N,{value:"multimodal"},{default:s(()=>[...e[45]||(e[45]=[o(" Изображения на вход ",-1)])]),_:1}),i(N,{value:"image"},{default:s(()=>[...e[46]||(e[46]=[o(" Генерация ",-1)])]),_:1}),i(N,{value:"tools"},{default:s(()=>[...e[47]||(e[47]=[o(" Инструменты ",-1)])]),_:1})]),_:1},8,["modelValue"]),i(Ye,{modelValue:$.value,"onUpdate:modelValue":e[12]||(e[12]=a=>$.value=a),class:"mt-4"},{default:s(()=>[i(B,{value:"text"},{default:s(()=>[i(C,{type:"info",variant:"tonal",density:"compact",class:"mb-4"},{default:s(()=>[...e[48]||(e[48]=[o(" Базовый пример отправки текстового сообщения. Текст поддерживают все модели. ",-1)])]),_:1}),i(U,{examples:k.text,"tab-key":"text","active-lang":te.value,"copied-key":f.value,"onUpdate:activeLang":e[4]||(e[4]=a=>te.value=a),onCopy:b},null,8,["examples","active-lang","copied-key"]),e[49]||(e[49]=t("h4",{class:"text-subtitle-2 font-weight-bold mt-4 mb-2"}," Пример ответа ",-1)),t("div",mt,[i(w,{class:"copy-btn",size:"x-small",variant:"text",icon:"mdi-content-copy",title:f.value==="text-resp"?"Скопировано":"Скопировать",onClick:e[5]||(e[5]=a=>b(k.text.response,"text-resp"))},null,8,["title"]),t("pre",null,r(k.text.response),1)])]),_:1}),i(B,{value:"multimodal"},{default:s(()=>[i(C,{type:"info",variant:"tonal",density:"compact",class:"mb-4"},{default:s(()=>[e[50]||(e[50]=t("div",{class:"mb-2"}," Передача изображений через URL и Base64. ",-1)),e[51]||(e[51]=t("div",{class:"text-caption font-weight-medium mb-1"}," Поддерживаемые модели: ",-1)),t("div",ut,[(l(!0),g(_,null,x($e.value,a=>(l(),u(y,{key:a,size:"x-small",variant:"tonal",color:"info"},{default:s(()=>[o(r(a),1)]),_:2},1024))),128)),de.value?(l(),u(y,{key:0,size:"x-small",variant:"outlined",color:"info"},{default:s(()=>[o(" и ещё "+r(de.value)+" — GET /api/ai-models ",1)]),_:1})):q("",!0)])]),_:1}),i(U,{examples:k.multimodal,"tab-key":"multi","active-lang":ae.value,"copied-key":f.value,"onUpdate:activeLang":e[6]||(e[6]=a=>ae.value=a),onCopy:b},null,8,["examples","active-lang","copied-key"]),e[52]||(e[52]=t("h4",{class:"text-subtitle-2 font-weight-bold mt-4 mb-2"}," Пример ответа ",-1)),t("div",gt,[i(w,{class:"copy-btn",size:"x-small",variant:"text",icon:"mdi-content-copy",title:f.value==="multi-resp"?"Скопировано":"Скопировать",onClick:e[7]||(e[7]=a=>b(k.multimodal.response,"multi-resp"))},null,8,["title"]),t("pre",null,r(k.multimodal.response),1)])]),_:1}),i(B,{value:"image"},{default:s(()=>[i(C,{type:"info",variant:"tonal",density:"compact",class:"mb-4"},{default:s(()=>[e[53]||(e[53]=t("div",{class:"mb-2"}," Генерация изображений по промпту. ",-1)),e[54]||(e[54]=t("div",{class:"text-caption font-weight-medium mb-1"}," Модели: ",-1)),t("div",ht,[(l(!0),g(_,null,x(Se.value,a=>(l(),u(y,{key:a,size:"x-small",variant:"tonal",color:"info"},{default:s(()=>[o(r(a),1)]),_:2},1024))),128)),me.value?(l(),u(y,{key:0,size:"x-small",variant:"outlined",color:"info"},{default:s(()=>[o(" и ещё "+r(me.value)+" — GET /api/ai-models/images ",1)]),_:1})):q("",!0)]),e[55]||(e[55]=t("div",{class:"text-caption font-weight-medium mb-1"}," aspect_ratio: ",-1)),t("div",ft,[(l(),g(_,null,x(Re,a=>i(y,{key:a.ratio,size:"x-small",variant:"outlined"},{default:s(()=>[o(r(a.ratio)+" → "+r(a.size),1)]),_:2},1024)),64))]),e[56]||(e[56]=t("div",{class:"text-caption font-weight-medium mb-1"}," image_size: ",-1)),t("div",yt,[(l(),g(_,null,x(Ge,a=>i(y,{key:a.size,size:"x-small",variant:"outlined"},{default:s(()=>[o(r(a.size)+" — "+r(a.label),1)]),_:2},1024)),64))])]),_:1}),i(U,{examples:k.image,"tab-key":"image","active-lang":ie.value,"copied-key":f.value,"onUpdate:activeLang":e[8]||(e[8]=a=>ie.value=a),onCopy:b},null,8,["examples","active-lang","copied-key"]),e[57]||(e[57]=t("h4",{class:"text-subtitle-2 font-weight-bold mt-4 mb-2"}," Пример ответа ",-1)),t("div",vt,[i(w,{class:"copy-btn",size:"x-small",variant:"text",icon:"mdi-content-copy",title:f.value==="image-resp"?"Скопировано":"Скопировать",onClick:e[9]||(e[9]=a=>b(k.image.response,"image-resp"))},null,8,["title"]),t("pre",null,r(k.image.response),1)])]),_:1}),i(B,{value:"tools"},{default:s(()=>[i(C,{type:"info",variant:"tonal",density:"compact",class:"mb-4"},{default:s(()=>[e[58]||(e[58]=t("div",{class:"mb-2"}," Описание функций, которые модель может вызвать для получения данных. ",-1)),e[59]||(e[59]=t("div",{class:"text-caption font-weight-medium mb-1"}," Поддерживаемые модели: ",-1)),t("div",bt,[(l(!0),g(_,null,x(Ne.value,a=>(l(),u(y,{key:a,size:"x-small",variant:"tonal",color:"info"},{default:s(()=>[o(r(a),1)]),_:2},1024))),128))])]),_:1}),i(U,{examples:k.tools,"tab-key":"tools","active-lang":se.value,"copied-key":f.value,"onUpdate:activeLang":e[10]||(e[10]=a=>se.value=a),onCopy:b},null,8,["examples","active-lang","copied-key"]),e[60]||(e[60]=t("h4",{class:"text-subtitle-2 font-weight-bold mt-4 mb-2"}," Пример ответа (вызов функции) ",-1)),t("div",_t,[i(w,{class:"copy-btn",size:"x-small",variant:"text",icon:"mdi-content-copy",title:f.value==="tools-resp"?"Скопировано":"Скопировать",onClick:e[11]||(e[11]=a=>b(k.tools.response,"tools-resp"))},null,8,["title"]),t("pre",null,r(k.tools.response),1)])]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1}),e[68]||(e[68]=t("h2",{class:"text-h5 font-weight-bold mb-4"}," Эндпоинты ",-1)),(l(!0),g(_,null,x(O.value,a=>(l(),u(T,{id:a.path.replace("#",""),key:a.path,variant:"outlined",class:"mb-6 endpoint-card"},{default:s(()=>[i(c,null,{default:s(()=>[t("div",xt,[i(y,{color:V(a.method),variant:"flat",label:"",class:"font-weight-bold method-chip"},{default:s(()=>[o(r(a.method),1)]),_:2},1032,["color"]),t("code",kt,r(a.url),1),i(Me),i(w,{size:"x-small",variant:"text",icon:"mdi-content-copy",title:f.value===a.path?"Скопировано":"Скопировать URL",onClick:m=>b(a.url,a.path)},null,8,["title","onClick"])]),t("div",Tt,r(a.shortTitle),1),t("p",wt,r(a.description),1),t("div",At,[e[62]||(e[62]=t("h3",{class:"text-subtitle-2 font-weight-bold mb-0"}," Параметры запроса ",-1)),a.in?(l(),u(y,{key:0,size:"x-small",variant:"flat",class:"ctype-chip"},{default:s(()=>[o(r(a.in),1)]),_:2},1024)):q("",!0)]),a.parameters&&a.parameters.length?(l(),u(we,{key:0,density:"comfortable",class:"params-table mb-4"},{default:s(()=>[e[65]||(e[65]=t("thead",null,[t("tr",null,[t("th",null,"Параметр"),t("th",null,"Тип"),t("th",null,"Обязательный"),t("th",null,"По умолчанию"),t("th",null,"Описание")])],-1)),t("tbody",null,[(l(!0),g(_,null,x(a.parameters,m=>(l(),g("tr",{key:m.name},[t("td",Pt,[t("code",null,r(m.name),1)]),t("td",It,[t("span",Ct,r(m.schema?.type),1)]),t("td",qt,[m.required&&m.required_variant?(l(),u(y,{key:0,size:"x-small",color:"warning",variant:"flat"},{default:s(()=>[...e[63]||(e[63]=[o(" на выбор ",-1)])]),_:1})):m.required?(l(),u(y,{key:1,size:"x-small",color:"error",variant:"flat"},{default:s(()=>[...e[64]||(e[64]=[o(" required ",-1)])]),_:1})):(l(),g("span",zt," — "))]),t("td",Ot,[m.default!==void 0&&m.default!==""&&m.default!==null?(l(),g("code",Et,r(m.default),1)):(l(),g("span",jt,"—"))]),t("td",$t,r(m.description),1)]))),128))])]),_:2},1024)):(l(),g("p",St," Параметры отсутствуют ")),e[66]||(e[66]=t("h3",{class:"text-subtitle-2 font-weight-bold mt-4 mb-2"}," Ответы ",-1)),i(Te,{variant:"accordion",class:"response-panels"},{default:s(()=>[(l(!0),g(_,null,x(a.responses,(m,j)=>(l(),u(ke,{key:j},{default:s(()=>[i(ve,null,{default:s(()=>[i(y,{color:he(String(j)),size:"small",variant:"flat",label:"",class:"me-3"},{default:s(()=>[o(r(j),1)]),_:2},1032,["color"]),o(" "+r(m.description),1)]),_:2},1024),m.content?(l(),u(xe,{key:0},{default:s(()=>[t("div",Rt,[i(w,{class:"copy-btn",size:"x-small",variant:"text",icon:"mdi-content-copy",title:f.value===`${a.path}-${j}`?"Скопировано":"Скопировать",onClick:Bt=>b(JSON.stringify(m.content,null,2),`${a.path}-${j}`)},null,8,["title","onClick"]),t("pre",null,r(JSON.stringify(m.content,null,2)),1)])]),_:2},1024)):q("",!0)]),_:2},1024))),128))]),_:2},1024)]),_:2},1024)]),_:2},1032,["id"]))),128))]),_:1}),Z(ee)?q("",!0):(l(),u(F,{key:0,cols:"3",lg:"3",class:"d-none d-md-block"},{default:s(()=>[t("div",Gt,[e[69]||(e[69]=t("div",{class:"text-subtitle-2 font-weight-bold mb-3"}," На этой странице ",-1)),i(_e,{density:"compact",class:"bg-transparent toc-list"},{default:s(()=>[(l(!0),g(_,null,x(O.value,a=>(l(),u(be,{key:a.path,title:a.shortTitle,active:oe.value===a.path,color:"primary",onClick:m=>fe(a.path)},{prepend:s(()=>[i(y,{color:V(a.method),size:"x-small",variant:"flat",label:"",class:"me-2 method-chip toc-method"},{default:s(()=>[o(r(a.method),1)]),_:2},1032,["color"])]),_:2},1032,["title","active","onClick"]))),128))]),_:1})])]),_:1}))]),_:1})]),_:1})}}},Ft=Je(Ut,[["__scopeId","data-v-1780b4c2"]]);export{Ft as default};
