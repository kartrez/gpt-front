import{_ as Oe}from"./CTwLY0S1.js";import{A as Ge}from"./DKsZ7hlz.js";import{D as me}from"./BozHYTMY.js";import{_ as Le,u as $e,C as Ue,z as Ke,O as U,k as A,H as Be,i as Ne,c as u,w as i,r as p,o as l,e as s,p as q,b as t,g as f,q as ue,f as o,t as r,F as _,h as x,s as T,T as z}from"./DdYJdR3W.js";import{u as Ye}from"./BzZS6IgC.js";import"./D7ffLrzk.js";const He={class:"d-flex flex-column flex-md-row align-md-center ga-4"},De={class:"flex-shrink-0"},Me={class:"text-body-1 mb-3"},Ve={class:"code-block position-relative"},Je={class:"code-block position-relative mb-4"},Fe={class:"code-block position-relative"},We={class:"d-flex flex-wrap ga-1"},Qe={class:"code-block position-relative"},Ze={class:"d-flex flex-wrap mb-3 ga-1"},Xe={class:"d-flex flex-wrap mb-3 ga-1"},et={class:"d-flex flex-wrap ga-1"},tt={class:"code-block position-relative"},at={class:"d-flex flex-wrap ga-1"},it={class:"code-block position-relative"},st={class:"d-flex flex-wrap align-center mb-3 ga-2"},ot={class:"endpoint-url"},nt={class:"text-subtitle-1 font-weight-medium mb-1"},lt={class:"text-body-2 text-medium-emphasis mb-4"},rt={class:"d-flex align-center mb-2 ga-2"},pt={"data-label":"Параметр"},ct={"data-label":"Тип"},dt={class:"text-body-2 text-medium-emphasis"},mt={"data-label":"Обязательный"},ut={key:2,class:"text-caption text-medium-emphasis"},gt={"data-label":"По умолчанию"},ht={key:0},ft={key:1,class:"text-caption text-medium-emphasis"},yt={"data-label":"Описание",class:"text-body-2"},bt={key:1,class:"text-body-2 text-medium-emphasis mb-4"},vt={class:"code-block position-relative"},_t={class:"toc-sticky position-sticky overflow-y-auto pl-4"},xt=6,ge=`{
  "message": "Запрос отправлен к модели \`nope/nope\`, которой нет, проверьте на сайте поддерживаемые модели https://gpt-chat.by/pricing",
  "errors": [
    { "field": "model", "message": "Запрос отправлен к модели \`nope/nope\`, которой нет..." }
  ]
}`,kt={__name:"doc-api",async setup(Tt){let h,w;$e({title:"API документация - GPT-Chat",description:"Документация API GPT-Chat. Информация о доступе к API, эндпоинтах, форматах запросов и ответов для интеграции с нашими сервисами.",keywords:"API, документация, интеграция, эндпоинты, разработка, GPT-Chat API",robots:"index, follow"});const he=Ue(),fe=Ye(),ye=T(()=>fe.value&&he.loggedIn),{mobile:D}=Ke(),R=A("text"),M=A("curl"),V=A("curl"),J=A("curl"),F=A("curl"),y=A(null),W=A(null),S=new Ge,{data:K}=([h,w]=U(()=>S.getList()),h=await h,w(),h),{data:Q}=([h,w]=U(()=>S.getImageGenerationList()),h=await h,w(),h),{data:be}=([h,w]=U(()=>S.getVideoGenerationList()),h=await h,w(),h),{data:ve}=([h,w]=U(()=>S.getAudioGenerationList()),h=await h,w(),h),B=n=>{const e=new Set,c=[];for(const g of n){const d=g.split("/")[0];if(!e.has(d)&&(e.add(d),c.push(g),c.length===xt))break}return c},Z=n=>Math.max(0,n.length-B(n).length),O=(n,e="",c="")=>{const g=n.value?.length||0;return g===0?"":e?`${e} ${g}${c}`:` (${g})`},_e=[{code:400,when:"Неверный запрос: неизвестная модель, пустой или слишком длинный промпт, неподдерживаемый файл, нарушение любых ограничений полей"},{code:401,when:"Нет заголовка Authorization, ключ не найден, отозван или просрочен"},{code:402,when:"Не хватает баланса на оценочную стоимость запроса. В теле есть balance, estimatedCost и shortfall"},{code:403,when:"Ключ есть, но доступа к этому ресурсу нет"},{code:404,when:"Объект не найден: чужая или удалённая коллекция, истёкшая задача генерации"},{code:429,when:"Слишком часто. Действует на распознавание речи, презентации и разбор брендбука"},{code:500,when:"Ошибка на нашей стороне — запрос можно повторить"}],xe=T(()=>(K.value||[]).map(n=>n.name)),ke=n=>{const e=new Set(xe.value);return n.filter(c=>e.has(c))},X=T(()=>(K.value||[]).filter(n=>(n.input_modalities||[]).includes("image")).map(n=>n.name)),Te=T(()=>B(X.value)),ee=T(()=>Z(X.value)),te=T(()=>(Q.value||[]).map(n=>n.name)),we=T(()=>B(te.value)),ae=T(()=>Z(te.value)),Ae=[{ratio:"1:1",size:"1024×1024"},{ratio:"2:3",size:"832×1248"},{ratio:"3:2",size:"1248×832"},{ratio:"3:4",size:"864×1184"},{ratio:"4:3",size:"1184×864"},{ratio:"4:5",size:"896×1152"},{ratio:"5:4",size:"1152×896"},{ratio:"9:16",size:"768×1344"},{ratio:"16:9",size:"1344×768"},{ratio:"21:9",size:"1536×672"}],qe=[{size:"0.5K",label:"черновик"},{size:"1K",label:"стандарт"},{size:"2K",label:"высокое"},{size:"4K",label:"максимум"}],ze=T(()=>ke(["qwen/plus-3.7","qwen/max-3.7","google/gemini-3-flash","deepseek/deepseek-v4-pro","anthropic/claude-sonnet-5","openai/gpt-5.6-terra"])),b={text:{curl:`curl https://api.gpt-chat.by/api/chat/completions \\
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
    "model": "google/gemini-3-flash",
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
    "model": "google/gemini-3-flash",
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
    "model" => "google/gemini-3-flash",
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
    model: "google/gemini-3-flash",
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
    "model": "google/gemini-3-flash",
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
    "model": "google/gemini-3-flash",
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
    "model" => "google/gemini-3-flash",
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
  model: "google/gemini-3-flash",
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
}`}},P=A([{path:"#ai-models",shortTitle:"Каталог моделей",method:"GET",title:"Список моделей и цен",description:`Единственный достоверный источник слагов для параметра model${O(K,": сейчас в каталоге"," чат-моделей")}. Авторизация не нужна. Каталоги по типам генерации лежат на отдельных путях: /api/ai-models/images — генерация и редактирование картинок${O(Q)}, /api/ai-models/videos — видео${O(be)}, /api/ai-models/audio — озвучка и музыка${O(ve)}, /api/ai-models/transcribe — распознавание речи. Слаги из разных каталогов не взаимозаменяемы: модель для /chat/video не подойдёт для /chat/completions.`,url:"https://api.gpt-chat.by/api/ai-models",parameters:[],responses:{200:{description:"Массив моделей. price_input / price_output — цена за 1 млн токенов в BYN, price_input_rub / price_output_rub — она же в RUB. В каталогах видео, аудио и транскрибации поле price — цена за секунду, за единицу генерации и за минуту соответственно.",content:[{name:"google/gemma-4",display_name:"Gemma 4",price_input:.31,price_output:1.55,price_input_rub:8.7,price_output_rub:43.5,max_input:1e6,max_output:64e3,context:1e6,color:"blue",input_modalities:["text","image"],output_modalities:["text"]}]}}},{path:"#chat-completions",shortTitle:"Chat completions",method:"POST",title:"Получить ответ от AI модели",description:"Отправляет сообщения в AI модель и возвращает ответ. Совместимо с OpenAI Chat Completions API. Перед вашими сообщениями сервис подставляет свой системный промпт: он просит модель рассуждать по-английски, а отвечать на языке пользователя (по умолчанию — русском), и при enableSearch=true добавляет текущую дату с требованием брать факты из результатов поиска. Этот промпт входит в prompt_tokens (~30 токенов) и не отключается — если нужен другой язык ответа, задайте его своим сообщением с role=system или прямо в тексте запроса.",url:"https://api.gpt-chat.by/api/chat/completions",in:"json/body",parameters:[{name:"messages",description:"Массив сообщений, формирующих диалог. Поддерживает текст, изображения и вызов инструментов.",required:!0,default:"",schema:{type:"array"}},{name:"model",description:"Слаг модели AI (например, google/gemma-4, anthropic/claude-opus-5, openai/gpt-5.6-sol). Полный список слагов — на /pricing или через GET /api/ai-models.",required:!1,default:"google/gemma-4",schema:{type:"string"}},{name:"collectionId",description:"Идентификатор коллекции RAG для использования ваших документов",required:!1,default:"",schema:{type:"uuid"}},{name:"temperature",description:"Температура генерации (0.1 — 1.0)",required:!1,default:"0.1",schema:{type:"number"}},{name:"stream",description:"Использовать потоковую передачу данных. Ответ идёт как text/event-stream: строки «data: {чанк}», последний чанк несёт usage, поток закрывается строкой «data: [DONE]»",required:!1,default:"false",schema:{type:"boolean"}},{name:"thinking",description:"Включить режим глубоких размышлений (для поддерживаемых моделей)",required:!1,default:"false",schema:{type:"boolean"}},{name:"enableSearch",description:"Включить поиск в интернете перед ответом (для поддерживаемых моделей)",required:!1,default:"false",schema:{type:"boolean"}},{name:"searchOptions",description:"Настройки веб-поиска: max_results (1–10, по умолчанию 10), engine (native | exa | parallel | perplexity — по умолчанию perplexity: поиск делает поисковый API, а отвечает выбранная вами модель), search_prompt",required:!1,default:"null",schema:{type:"object"}},{name:"assistantId",description:"Идентификатор вашего кастомного ассистента (персоны) — подставляет его системный промпт",required:!1,default:null,schema:{type:"uuid"}},{name:"useMemory",description:"Использовать долговременную память пользователя и сохранённые инструкции в контексте ответа",required:!1,default:"true",schema:{type:"boolean"}},{name:"imageConfig",description:"Настройки выходной картинки для chat-capable image-моделей. Объект с полями aspect_ratio (1:1, 2:3, 3:2, 3:4, 4:3, 4:5, 5:4, 9:16, 16:9, 21:9) и image_size (0.5K, 1K, 2K, 4K). modalities выставляются автоматически по модели.",required:!1,default:null,schema:{type:"object"}},{name:"tools",description:"Список инструментов (функций), которые может вызывать модель",required:!1,default:null,schema:{type:"array"}}],responses:{200:{description:"Успешный ответ от AI модели",content:{id:"chatcmpl-9d9aacd0-b2e2-9f4c-a267-2a43e3ad3bd8",object:"chat.completion",created:1754499895,model:"google/gemma-4",usage:{prompt_tokens:384,completion_tokens:552,total_tokens:936,cost:4536e-7,cost_byn:.001376,prompt_tokens_details:{cached_tokens:7}},choices:[{message:{role:"assistant",content:"Если ты хочешь что то узнать — просто скажи! 😺"},finish_reason:"stop",index:0,logprobs:null}]}},400:{description:"Некорректный запрос"},401:{description:"Не авторизован"},402:{description:"Недостаточно средств на балансе"},500:{description:"Внутренняя ошибка сервера"}}},{path:"#chat-image-generate",shortTitle:"Сгенерировать изображение",method:"POST",title:"Генерация изображения по промпту",description:"Стоимость зависит от выбранной модели (обычно ~$0.04–0.20 за изображение). Списывается с баланса.",url:"https://api.gpt-chat.by/api/chat/image",in:"json/body",parameters:[{name:"prompt",description:"Текстовое описание желаемого изображения (1—2000 символов)",required:!0,schema:{type:"string"}},{name:"model",description:"Слаг image-модели: google/gemini-2.5-flash-image, google/gemini-3-flash-image, google/gemini-3.1-flash-image-preview, openai/gpt-5.4-image-2 и др.",required:!1,default:"google/gemini-2.5-flash-image",schema:{type:"string"}},{name:"aspectRatio",description:"Соотношение сторон: 1:1, 2:3, 3:2, 3:4, 4:3, 4:5, 5:4, 9:16, 16:9, 21:9. Если не указано — решает модель.",required:!1,default:null,schema:{type:"string"}},{name:"imageSize",description:"Разрешение: 1K, 2K, 4K. Зависит от модели (для google/gemini-2.5-flash-image доступно только 1K).",required:!1,default:null,schema:{type:"string"}}],responses:{200:{description:"Изображение сгенерировано",content:{image:"data:image/jpeg;base64,/9j/4AAQSkZJRg...",balance:12.34,isFree:!1}},400:{description:"Некорректный запрос"},401:{description:"Не авторизован"},402:{description:"Недостаточно средств на балансе"},500:{description:"Внутренняя ошибка сервера"}}},{path:"#chat-image-edit",shortTitle:"Отредактировать изображение",method:"POST",title:"Редактирование изображения по промпту",description:"Принимает одно (image) или несколько (images[], до 3) исходных изображений и текстовое описание правки. Стоимость ~$0.11.",url:"https://api.gpt-chat.by/api/chat/image/edit",in:"multipart/form-data",parameters:[{name:"prompt",description:"Описание правки (5—600 символов)",required:!0,schema:{type:"string"}},{name:"image",description:"Одно исходное изображение (JPG, PNG, WebP), максимум 10 МБ",required:!0,required_variant:!0,schema:{type:"file"}},{name:"images[]",description:"Несколько исходных изображений (JPG, PNG, WebP), до 3 файлов, каждый ≤10 МБ. Используйте вместо image для мультиизображений.",required:!0,required_variant:!0,schema:{type:"file[]"}},{name:"model",description:"Слаг image-модели для редактирования",required:!1,default:"google/gemini-2.5-flash-image",schema:{type:"string"}}],responses:{200:{description:"Изображение успешно отредактировано",content:{image:"data:image/jpeg;base64,/9j/4AAQSkZJRg...",balance:12.23,isFree:!1}},400:{description:"Некорректный запрос (формат, размер, длина prompt)"},401:{description:"Не авторизован"},402:{description:"Недостаточно средств на балансе"},500:{description:"Внутренняя ошибка сервера"}}},{path:"#chat-video-generate",shortTitle:"Сгенерировать видео",method:"POST",title:"Генерация видео из текста (асинхронно)",description:"Возвращает taskId для поллинга через GET /api/chat/video/status/{taskId}. Длительность, разрешение и стоимость зависят от выбранной модели.",url:"https://api.gpt-chat.by/api/chat/video",in:"json/body",parameters:[{name:"prompt",description:"Текстовое описание видео (1—2000 символов)",required:!0,schema:{type:"string"}},{name:"model",description:"Слаг видео-модели: alibaba/wan-2.6, alibaba/wan-2.7, google/veo-3.1, google/veo-3.1-fast, bytedance/seedance-1-5-pro, bytedance/seedance-2.0, bytedance/seedance-2.0-fast, black-forest-labs/flux-3-video, openai/sora-2-pro, kwaivgi/kling-v3.0-pro, kwaivgi/kling-v3.0-std, x-ai/grok-imagine-video.",required:!1,default:"alibaba/wan-2.6",schema:{type:"string"}},{name:"resolution",description:"Разрешение: 480p, 720p, 1080p. Набор зависит от модели; если не указано — берётся дефолт модели.",required:!1,default:null,schema:{type:"string"}},{name:"duration",description:"Длительность в секундах. Допустимые значения зависят от модели; если не указано — дефолт модели.",required:!1,default:null,schema:{type:"integer"}}],responses:{200:{description:"Задача поставлена в очередь",content:{taskId:"b3a1c0d2-3e4f-5a6b-7c8d-9e0f1a2b3c4d",status:"pending"}},401:{description:"Не авторизован"},402:{description:"Недостаточно средств"},500:{description:"Внутренняя ошибка сервера"}}},{path:"#chat-video-from-image",shortTitle:"Видео из изображения",method:"POST",title:"Генерация видео из изображения (асинхронно)",description:"Принимает исходное изображение и описание движения. Возвращает taskId для поллинга. Стоимость зависит от выбранной модели.",url:"https://api.gpt-chat.by/api/chat/video/image",in:"multipart/form-data",parameters:[{name:"image",description:"Исходный файл (JPG, PNG, WebP), максимум 10 МБ",required:!0,schema:{type:"file"}},{name:"prompt",description:"Описание желаемого движения/анимации (5—600 символов)",required:!0,schema:{type:"string"}},{name:"model",description:"Слаг видео-модели с поддержкой image-to-video: alibaba/wan-2.6, alibaba/wan-2.7, google/veo-3.1, google/veo-3.1-fast, bytedance/seedance-1-5-pro, bytedance/seedance-2.0, black-forest-labs/flux-3-video, openai/sora-2-pro, kwaivgi/kling-v3.0-pro и др.",required:!1,default:"alibaba/wan-2.6",schema:{type:"string"}},{name:"resolution",description:"Разрешение: 480p, 720p, 1080p. Набор зависит от модели; если не указано — дефолт модели.",required:!1,default:null,schema:{type:"string"}},{name:"duration",description:"Длительность в секундах. Допустимые значения зависят от модели; если не указано — дефолт модели.",required:!1,default:null,schema:{type:"integer"}}],responses:{200:{description:"Задача поставлена в очередь",content:{taskId:"b3a1c0d2-3e4f-5a6b-7c8d-9e0f1a2b3c4d",status:"pending"}},400:{description:"Некорректный запрос (формат, размер, длина prompt)"},401:{description:"Не авторизован"},402:{description:"Недостаточно средств"},500:{description:"Внутренняя ошибка сервера"}}},{path:"#chat-video-status",shortTitle:"Статус видео-задачи",method:"GET",title:"Получить статус генерации видео",description:'Поллинг задачи. Когда status="done", в первом ответе вернётся base64-видео и обновлённый баланс. Дальше задача считается доставленной.',url:"https://api.gpt-chat.by/api/chat/video/status/{taskId}",in:"path/string",parameters:[{name:"taskId",in:"path",description:"Идентификатор задачи, полученный при вызове /chat/video или /chat/video/image",required:!0,schema:{type:"string"}}],responses:{200:{description:"Готово (первая успешная доставка)",content:{status:"done",video:"data:video/mp4;base64,AAAAIGZ0eXBpc29t...",balance:11.83}},202:{description:"В процессе (продолжайте поллинг)",content:{status:"pending"}},403:{description:"Задача принадлежит другому пользователю"},404:{description:"Задача не найдена или истёк срок хранения (1 час)"},500:{description:"Внутренняя ошибка сервера"}}},{path:"#chat-voice-transcribe",shortTitle:"Распознать речь",method:"POST",title:"Распознавание речи (Speech-to-Text)",description:"Принимает короткое аудио (≤1 МБ, ~60 секунд). Rate-limited.",url:"https://api.gpt-chat.by/api/chat/voice/transcribe",in:"multipart/form-data",parameters:[{name:"voice",description:"Аудиофайл (webm, ogg, mp3, wav, mp4, m4a), максимум 1 МБ",required:!0,schema:{type:"file"}}],responses:{200:{description:"Распознанный текст",content:{text:"Привет, как дела?"}},400:{description:"Некорректный файл, неподдерживаемый формат или речь не распознана"},401:{description:"Не авторизован"},429:{description:"Слишком много запросов подряд"}}},{path:"#chat-audio-generate",shortTitle:"Сгенерировать аудио",method:"POST",title:"Генерация аудио (Text-to-Speech)",description:"Озвучивает текст или генерирует аудио по описанию. Возвращает аудио как data-URL и ссылку на файл, а также транскрипт. Списывает баланс согласно длительности и модели.",url:"https://api.gpt-chat.by/api/chat/audio",in:"json/body",parameters:[{name:"prompt",description:"Текст для озвучивания или описание для генерации аудио (от 1 до 4000 символов)",required:!0,schema:{type:"string"}},{name:"model",description:"Модель озвучки: openai/gpt-audio-mini, openai/gpt-audio, google/gemini-3.1-flash-tts-preview, hexgrad/kokoro-82m, mistralai/voxtral-mini-tts-2603; музыка: google/lyria-3-*",required:!1,default:"openai/gpt-audio-mini",schema:{type:"string"}},{name:"voice",description:"Голос озвучивания для моделей OpenAI: alloy, ash, ballad, coral, echo, fable, onyx, nova, sage, shimmer, verse. Если не указан — используется alloy",required:!1,default:"alloy",schema:{type:"string"}},{name:"duration",description:"Длительность аудио в секундах (до 300; для каждой модели свой максимум)",required:!1,default:"30",schema:{type:"number"}},{name:"format",description:"Формат выходного аудио: mp3, wav, opus, flac",required:!1,default:"mp3",schema:{type:"string"}},{name:"imageUrl",description:"Ссылка на изображение-референс (поддерживается только моделями Google Lyria)",required:!1,schema:{type:"url"}}],responses:{200:{description:"Аудио успешно сгенерировано",content:{audio:"data:audio/mpeg;base64,SUQzBAAA...",url:"https://api.gpt-chat.by/uploads/audio/019883b7-146e-713f-a102-25428208a460.mp3",transcript:"Привет, как дела?",balance:12.34,isFree:!1}},400:{description:"Некорректный запрос или неизвестная модель"},401:{description:"Не авторизован"},402:{description:"Недостаточно средств"},500:{description:"Внутренняя ошибка сервера"}}},{path:"#chat-file-extract",shortTitle:"Извлечь текст из файла",method:"POST",title:"Извлечение текста из документа",description:"Принимает документ и возвращает извлечённый текст. Текст обрезается до 200 000 символов.",url:"https://api.gpt-chat.by/api/chat/file/extract",in:"multipart/form-data",parameters:[{name:"file",description:`Документ: ${me.join(", ")}. Максимум 10 МБ`,required:!0,schema:{type:"file"}}],responses:{200:{description:"Текст извлечён",content:{filename:"report.pdf",extension:"pdf",sizeBytes:524288,text:"Содержимое документа...",charCount:12345,isTruncated:!1}},400:{description:"Некорректный файл, неподдерживаемое расширение или ошибка извлечения"},401:{description:"Не авторизован"}}},{path:"#rag-collections-create",shortTitle:"RAG: создать коллекцию",method:"POST",title:"Создать коллекцию RAG",description:"Создаёт новую коллекцию — папку раздела «Мои файлы», по документам которой модель будет отвечать (дообучения модели не происходит)",url:"https://api.gpt-chat.by/api/rag/collections",in:"json/body",parameters:[{name:"name",description:"Название коллекции",required:!0,schema:{type:"string"}}],responses:{201:{description:"Коллекция успешно создана",content:{documents:[],id:"019883b7-146e-713f-a102-25428208a460",name:"Default Collection"}},400:{description:"Некорректный запрос"},401:{description:"Не авторизован"},500:{description:"Внутренняя ошибка сервера"}}},{path:"#rag-collections-list",shortTitle:"RAG: список коллекций",method:"GET",title:"Получить список коллекций RAG",description:"Возвращает список всех коллекций текущего пользователя",url:"https://api.gpt-chat.by/api/rag/collections",in:"",parameters:[],responses:{200:{description:"Список коллекций",content:[{documents:[{id:"01988413-2557-7228-af02-6c3b8aae4635",name:"https://testy.com/",size:"83",type:"html"}],id:"019883b7-146e-713f-a102-25428208a460",name:"Default Collection"},{documents:[],id:"019883b7-146e-713f-a102-25428208a460",name:"Default Collection 2"},{documents:[],id:"019883b7-146e-713f-a102-25428208a460",name:"Default Collection 3"}]},401:{description:"Неавторизован"}}},{path:"#rag-collections-item",shortTitle:"RAG: получить коллекцию",method:"GET",title:"Получить информацию о коллекции RAG",description:"Возвращает информацию о конкретной коллекции",url:"https://api.gpt-chat.by/api/rag/collections/{collectionId}",in:"path/string",parameters:[{name:"collectionId",required:!0,schema:{type:"uuid"},description:"Идентификатор коллекции"}],responses:{200:{description:"Информация о коллекции",content:{documents:[{id:"01988413-2557-7228-af02-6c3b8aae4635",name:"https://testy.com/",size:"83",type:"html"}],id:"019883b7-146e-713f-a102-25428208a460",name:"Default Collection"}},401:{description:"Неавторизован"},404:{description:"Коллекция не найдена"}}},{path:"#rag-collections-update",shortTitle:"RAG: изменить коллекцию",method:"PUT",title:"Изменить коллекцию RAG",description:"Обновляет название коллекции и, при необходимости, привязывает Telegram-бота",url:"https://api.gpt-chat.by/api/rag/collections/{collectionId}",in:"json/body + path/string",parameters:[{name:"collectionId",in:"path",required:!0,schema:{type:"uuid"},description:"Идентификатор коллекции"},{name:"name",in:"body",required:!1,schema:{type:"string"},description:"Новое название коллекции"},{name:"telegramToken",in:"body",required:!1,schema:{type:"string"},description:"Токен Telegram-бота вида <bot_id>:<token> для отправки уведомлений"}],responses:{200:{description:"Коллекция успешно обновлена",content:{id:"019883b7-146e-713f-a102-25428208a460",name:"Support FAQ collection",telegramBotName:"SupportHelperBot",documents:[]}},400:{description:"Некорректный запрос"},401:{description:"Неавторизован"},404:{description:"Коллекция не найдена"},500:{description:"Внутренняя ошибка сервера"}}},{path:"#rag-collections-delete",shortTitle:"RAG: удалить коллекцию",method:"DELETE",title:"Удалить коллекцию RAG",description:"Удаляет коллекцию и все связанные с ней документы",url:"https://api.gpt-chat.by/api/rag/collections/{collectionId}",in:"path/string",parameters:[{name:"collectionId",required:!0,schema:{type:"uuid"},description:"Идентификатор коллекции"}],responses:{204:{description:"Коллекция успешно удалена"},401:{description:"Неавторизован"},404:{description:"Коллекция не найдена"},500:{description:"Внутренняя ошибка сервера"}}},{path:"#rag-collections-documents-create",shortTitle:"RAG: загрузить документ",method:"POST",title:"Загрузить документ в коллекцию RAG",description:"Добавляет новый документ в указанную коллекцию",url:"https://api.gpt-chat.by/api/rag/collections/{collectionId}/documents",in:"multipart/form-data + path/string",parameters:[{name:"collectionId",in:"path",required:!0,schema:{type:"uuid"},description:"Идентификатор коллекции"},{name:"url",required:!0,required_variant:!0,schema:{type:"url"},description:"Ссылка на интернет ресурс (имя документа берётся из URL)"},{name:"file",required:!0,required_variant:!0,schema:{type:"file"},description:`Файл: ${me.join(", ")}. Максимум 50 MB (имя документа берётся из имени файла)`}],responses:{201:{description:"Документ успешно добавлен",content:{id:"01988413-2557-7228-af02-6c3b8aae4635"}},400:{description:"Некорректный запрос"},401:{description:"Неавторизован"},404:{description:"Коллекция не найдена"},500:{description:"Внутренняя ошибка сервера"}}},{path:"#rag-collections-documents-delete",shortTitle:"RAG: удалить документ",method:"DELETE",title:"Удалить документ из коллекции RAG",description:"Удаляет конкретный документ из коллекции",url:"https://api.gpt-chat.by/api/rag/collections/{collectionId}/documents/{documentId}",in:"json/body + path/string",parameters:[{name:"collectionId",in:"path",required:!0,schema:{type:"uuid"},description:"Идентификатор коллекции"},{name:"documentId",in:"path",required:!0,schema:{type:"uuid"},description:"Идентификатор документа"}],responses:{204:{description:"Документ успешно удален"},401:{description:"Неавторизован"},404:{description:"Документ не найден"},500:{description:"Внутренняя ошибка сервера"}}},{path:"#assistants-list",shortTitle:"Ассистенты: список",method:"GET",title:"Список ваших ассистентов",description:"Возвращает ассистентов (персон) аккаунта. Поле id отсюда подставляется в параметр assistantId у POST /api/chat/completions.",url:"https://api.gpt-chat.by/api/assistants",parameters:[],responses:{200:{description:"Массив ассистентов",content:[{id:"01a04c4c-ebc3-7020-b1d7-715201657276",name:"Юрист",description:"Отвечает языком договоров",systemPrompt:"Ты — юрист. Отвечай сухо и со ссылками на нормы.",model:"anthropic/claude-sonnet-5",icon:"mdi-scale-balance"}]},401:{description:"Не авторизован"}}},{path:"#assistants-create",shortTitle:"Ассистенты: создать",method:"POST",title:"Создать ассистента",description:"Создаёт персону с собственным системным промптом.",url:"https://api.gpt-chat.by/api/assistants",in:"json/body",parameters:[{name:"name",description:"Название ассистента",required:!0,default:"",schema:{type:"string"}},{name:"systemPrompt",description:"Системный промпт персоны",required:!0,default:"",schema:{type:"string"}},{name:"description",description:"Короткое описание",required:!1,default:null,schema:{type:"string"}},{name:"model",description:"Модель по умолчанию (слаг из GET /api/ai-models)",required:!1,default:null,schema:{type:"string"}},{name:"icon",description:"Имя иконки для интерфейса",required:!1,default:null,schema:{type:"string"}}],responses:{201:{description:"Ассистент создан",content:{id:"01a04c4c-ebc3-7020-b1d7-715201657276",name:"Юрист"}},401:{description:"Не авторизован"}}},{path:"#assistants-update",shortTitle:"Ассистенты: изменить",method:"PUT",title:"Изменить ассистента",description:"Полностью перезаписывает поля ассистента. Чужой id даёт 404.",url:"https://api.gpt-chat.by/api/assistants/{assistantId}",in:"json/body + path/string",parameters:[{name:"assistantId",in:"path",description:"Идентификатор ассистента",required:!0,schema:{type:"uuid"}},{name:"name",description:"Название ассистента",required:!0,default:"",schema:{type:"string"}},{name:"systemPrompt",description:"Системный промпт персоны",required:!0,default:"",schema:{type:"string"}}],responses:{200:{description:"Ассистент обновлён"},401:{description:"Не авторизован"},404:{description:"Ассистент не найден"}}},{path:"#assistants-delete",shortTitle:"Ассистенты: удалить",method:"DELETE",title:"Удалить ассистента",description:"Удаляет персону аккаунта.",url:"https://api.gpt-chat.by/api/assistants/{assistantId}",in:"path/string",parameters:[{name:"assistantId",in:"path",description:"Идентификатор ассистента",required:!0,schema:{type:"uuid"}}],responses:{204:{description:"Ассистент удалён"},401:{description:"Не авторизован"},404:{description:"Ассистент не найден"}}},{path:"#memory-list",shortTitle:"Память: список",method:"GET",title:"Долговременная память аккаунта",description:"Факты и инструкции, которые подмешиваются в контекст при useMemory=true в POST /api/chat/completions.",url:"https://api.gpt-chat.by/api/profile/memory",parameters:[],responses:{200:{description:"Массив записей памяти",content:[{id:"01a04c4c-ebc3-7020-b1d7-715201657276",content:"Обращаться на «ты»"}]},401:{description:"Не авторизован"}}},{path:"#memory-create",shortTitle:"Память: добавить",method:"POST",title:"Добавить запись в память",description:"Добавляет факт или инструкцию в долговременную память аккаунта.",url:"https://api.gpt-chat.by/api/profile/memory",in:"json/body",parameters:[{name:"content",description:"Текст записи",required:!0,default:"",schema:{type:"string"}}],responses:{201:{description:"Запись создана",content:{id:"01a04c4c-ebc3-7020-b1d7-715201657276",content:"Обращаться на «ты»"}},401:{description:"Не авторизован"}}},{path:"#memory-delete",shortTitle:"Память: удалить",method:"DELETE",title:"Удалить запись памяти",description:"Удаляет одну запись долговременной памяти.",url:"https://api.gpt-chat.by/api/profile/memory/{memoryId}",in:"path/string",parameters:[{name:"memoryId",in:"path",description:"Идентификатор записи",required:!0,schema:{type:"uuid"}}],responses:{204:{description:"Запись удалена"},401:{description:"Не авторизован"},404:{description:"Запись не найдена"}}}]),N=n=>({GET:"success",POST:"info",PUT:"warning",DELETE:"error",PATCH:"primary"})[n]||"default",ie=n=>n.startsWith("2")?"success":n.startsWith("4")?"warning":n.startsWith("5")?"error":"default",se=n=>{const e=document.getElementById(n.replace("#",""));e&&e.scrollIntoView({behavior:"smooth",block:"start"})},v=async(n,e)=>{try{await navigator.clipboard.writeText(n),y.value=e,setTimeout(()=>{y.value===e&&(y.value=null)},1500)}catch(c){console.error("Clipboard error",c)}},Y=()=>{let e=null;for(const c of P.value){const g=document.getElementById(c.path.replace("#",""));if(!g)continue;g.getBoundingClientRect().top-120<=0&&(e=c.path)}W.value=e},G={props:["examples","tabKey","activeLang","copiedKey"],emits:["update:activeLang","copy"],setup(n,{emit:e}){const c=[{value:"curl",label:"cURL"},{value:"python",label:"Python"},{value:"php",label:"PHP"},{value:"js",label:"JS"}];return()=>z("div",[z("div",{class:"d-flex flex-wrap mb-2",style:"gap: 4px;"},c.map(g=>z(p("v-btn"),{size:"small",variant:n.activeLang===g.value?"tonal":"text",color:n.activeLang===g.value?"primary":void 0,onClick:()=>e("update:activeLang",g.value)},()=>g.label))),z("div",{class:"code-block position-relative"},[z(p("v-btn"),{class:"copy-btn",size:"x-small",variant:"text",icon:"mdi-content-copy",title:n.copiedKey===`${n.tabKey}-${n.activeLang}`?"Скопировано":"Скопировать",onClick:()=>e("copy",n.examples[n.activeLang],`${n.tabKey}-${n.activeLang}`)}),z("pre",n.examples[n.activeLang])])])}};return Be(()=>{window.addEventListener("scroll",Y,{passive:!0}),Y()}),Ne(()=>{window.removeEventListener("scroll",Y)}),(n,e)=>{const c=p("v-icon"),g=p("v-expansion-panel-title"),d=p("v-chip"),oe=p("v-list-item"),ne=p("v-list"),le=p("v-expansion-panel-text"),re=p("v-expansion-panel"),pe=p("v-expansion-panels"),Pe=p("v-avatar"),k=p("v-btn"),C=p("v-card-text"),I=p("v-card"),H=p("v-card-title"),Ce=Oe,ce=p("v-table"),E=p("v-alert"),L=p("v-tab"),Ie=p("v-tabs"),$=p("v-window-item"),Ee=p("v-window"),je=p("v-spacer"),de=p("v-col"),Re=p("v-row"),Se=p("v-container");return l(),u(Se,{fluid:"",class:"pa-4 pa-md-6 doc-api-page"},{default:i(()=>[s(Re,null,{default:i(()=>[s(de,{cols:"12",md:"9",lg:"9"},{default:i(()=>[e[48]||(e[48]=t("div",{class:"mb-6"},[t("h1",{class:"text-h4 text-md-h3 font-weight-bold mb-2"}," Документация API "),t("p",{class:"text-body-1 text-medium-emphasis"}," REST API для работы с чат-ботами и RAG-системой. Совместимо с OpenAI Chat Completions. ")],-1)),ue(D)?(l(),u(pe,{key:0,class:"mb-6"},{default:i(()=>[s(re,null,{default:i(()=>[s(g,null,{default:i(()=>[s(c,{icon:"mdi-format-list-bulleted",class:"me-2"}),o(" Содержание ("+r(P.value.length)+" эндпоинтов) ",1)]),_:1}),s(le,null,{default:i(()=>[s(ne,{density:"compact",class:"pa-0"},{default:i(()=>[(l(!0),f(_,null,x(P.value,a=>(l(),u(oe,{key:a.path,title:a.shortTitle,onClick:m=>se(a.path)},{prepend:i(()=>[s(d,{color:N(a.method),size:"x-small",variant:"flat",label:"",class:"me-2 method-chip"},{default:i(()=>[o(r(a.method),1)]),_:2},1032,["color"])]),_:2},1032,["title","onClick"]))),128))]),_:1})]),_:1})]),_:1})]),_:1})):q("",!0),s(I,{color:"primary",variant:"flat",class:"mb-6 keys-cta",rounded:"lg"},{default:i(()=>[s(C,{class:"pa-5 pa-md-6"},{default:i(()=>[t("div",He,[s(Pe,{color:"white",size:"56",class:"flex-shrink-0"},{default:i(()=>[s(c,{icon:"mdi-key-plus",color:"primary",size:"32"})]),_:1}),e[14]||(e[14]=t("div",{class:"flex-grow-1"},[t("div",{class:"text-h6 font-weight-bold text-white mb-1"}," Начните с создания API ключа "),t("div",{class:"text-body-2 text-white",style:{opacity:"0.9"}},[o(" Все запросы авторизуются Bearer-токеном. Сгенерируйте ключ в личном кабинете и подставьте его в заголовок "),t("code",{class:"cta-code"},"Authorization"),o(". ")])],-1)),t("div",De,[ye.value?(l(),u(k,{key:0,to:"/keys/",color:"white",variant:"flat",size:"large","prepend-icon":"mdi-key-plus",class:"text-primary font-weight-bold"},{default:i(()=>[...e[12]||(e[12]=[o(" Создать ключ ",-1)])]),_:1})):(l(),u(k,{key:1,to:"/keys/",color:"white",variant:"flat",size:"large","prepend-icon":"mdi-login",class:"text-primary font-weight-bold"},{default:i(()=>[...e[13]||(e[13]=[o(" Войти и создать ключ ",-1)])]),_:1}))])])]),_:1})]),_:1}),s(I,{variant:"outlined",class:"mb-6"},{default:i(()=>[s(H,{class:"text-h5 font-weight-bold"},{default:i(()=>[s(c,{icon:"mdi-key-outline",color:"primary",class:"me-2"}),e[15]||(e[15]=o(" Авторизация ",-1))]),_:1}),s(C,null,{default:i(()=>[t("p",Me,[e[17]||(e[17]=o(" Все запросы используют Bearer-токен. Управление ключами — на странице ",-1)),s(Ce,{to:"/keys/",class:"text-primary font-weight-medium"},{default:i(()=>[...e[16]||(e[16]=[o(" API Ключи ",-1)])]),_:1}),e[18]||(e[18]=o(". ",-1))]),t("div",Ve,[s(k,{class:"copy-btn",size:"x-small",variant:"text",icon:"mdi-content-copy",title:y.value==="auth"?"Скопировано":"Скопировать",onClick:e[0]||(e[0]=a=>v("Authorization: Bearer YOUR_API_KEY","auth"))},null,8,["title"]),e[19]||(e[19]=t("pre",null,"Authorization: Bearer YOUR_API_KEY",-1))])]),_:1})]),_:1}),s(I,{variant:"outlined",class:"mb-6"},{default:i(()=>[s(H,{class:"text-h5 font-weight-bold"},{default:i(()=>[s(c,{icon:"mdi-alert-circle-outline",color:"primary",class:"me-2"}),e[20]||(e[20]=o(" Формат ошибок ",-1))]),_:1}),s(C,null,{default:i(()=>[e[23]||(e[23]=t("p",{class:"text-body-1 mb-3"},[o(" Все ошибки приходят одним объектом с полем "),t("code",null,"message"),o(" — его достаточно, чтобы показать человеку причину. Если ошибка относится к конкретным полям запроса, рядом лежит "),t("code",null,"errors"),o(" с разбивкой. ")],-1)),t("div",Je,[s(k,{class:"copy-btn",size:"x-small",variant:"text",icon:"mdi-content-copy",title:y.value==="err"?"Скопировано":"Скопировать",onClick:e[1]||(e[1]=a=>v(ge,"err"))},null,8,["title"]),t("pre",null,r(ge))]),s(ce,{density:"compact",class:"mb-2"},{default:i(()=>[e[21]||(e[21]=t("thead",null,[t("tr",null,[t("th",null,"Код"),t("th",null,"Когда")])],-1)),t("tbody",null,[(l(),f(_,null,x(_e,a=>t("tr",{key:a.code},[t("td",null,[s(d,{color:ie(String(a.code)),size:"x-small",variant:"flat",label:""},{default:i(()=>[o(r(a.code),1)]),_:2},1032,["color"])]),t("td",null,r(a.when),1)])),64))])]),_:1}),s(E,{type:"info",variant:"tonal",density:"compact"},{default:i(()=>[...e[22]||(e[22]=[o(" Любая проблема с телом запроса — неизвестный слаг модели, пустой промпт, неверный формат файла — это ",-1),t("strong",null,"400",-1),o(". Отдельного кода 422 у API больше нет. ",-1)])]),_:1})]),_:1})]),_:1}),s(I,{variant:"outlined",class:"mb-6"},{default:i(()=>[s(H,{class:"text-h5 font-weight-bold"},{default:i(()=>[s(c,{icon:"mdi-message-text-outline",color:"primary",class:"me-2"}),e[24]||(e[24]=o(" Формирование сообщений ",-1))]),_:1}),s(C,null,{default:i(()=>[e[42]||(e[42]=t("p",{class:"text-body-1 mb-4"},[o(" Запросы строятся на основе массива "),t("code",null,"messages"),o(". Каждое сообщение имеет "),t("code",null,"role"),o(" (system/user/assistant) и "),t("code",null,"content"),o(". ")],-1)),s(Ie,{modelValue:R.value,"onUpdate:modelValue":e[2]||(e[2]=a=>R.value=a),color:"primary","show-arrows":"",class:"swipe-hint"},{default:i(()=>[s(L,{value:"text"},{default:i(()=>[...e[25]||(e[25]=[o(" Текст ",-1)])]),_:1}),s(L,{value:"multimodal"},{default:i(()=>[...e[26]||(e[26]=[o(" Изображения на вход ",-1)])]),_:1}),s(L,{value:"image"},{default:i(()=>[...e[27]||(e[27]=[o(" Генерация ",-1)])]),_:1}),s(L,{value:"tools"},{default:i(()=>[...e[28]||(e[28]=[o(" Инструменты ",-1)])]),_:1})]),_:1},8,["modelValue"]),s(Ee,{modelValue:R.value,"onUpdate:modelValue":e[11]||(e[11]=a=>R.value=a),class:"mt-4"},{default:i(()=>[s($,{value:"text"},{default:i(()=>[s(E,{type:"info",variant:"tonal",density:"compact",class:"mb-4"},{default:i(()=>[...e[29]||(e[29]=[o(" Базовый пример отправки текстового сообщения. Текст поддерживают все модели. ",-1)])]),_:1}),s(G,{examples:b.text,"tab-key":"text","active-lang":M.value,"copied-key":y.value,"onUpdate:activeLang":e[3]||(e[3]=a=>M.value=a),onCopy:v},null,8,["examples","active-lang","copied-key"]),e[30]||(e[30]=t("h4",{class:"text-subtitle-2 font-weight-bold mt-4 mb-2"}," Пример ответа ",-1)),t("div",Fe,[s(k,{class:"copy-btn",size:"x-small",variant:"text",icon:"mdi-content-copy",title:y.value==="text-resp"?"Скопировано":"Скопировать",onClick:e[4]||(e[4]=a=>v(b.text.response,"text-resp"))},null,8,["title"]),t("pre",null,r(b.text.response),1)])]),_:1}),s($,{value:"multimodal"},{default:i(()=>[s(E,{type:"info",variant:"tonal",density:"compact",class:"mb-4"},{default:i(()=>[e[31]||(e[31]=t("div",{class:"mb-2"}," Передача изображений через URL и Base64. ",-1)),e[32]||(e[32]=t("div",{class:"text-caption font-weight-medium mb-1"}," Поддерживаемые модели: ",-1)),t("div",We,[(l(!0),f(_,null,x(Te.value,a=>(l(),u(d,{key:a,size:"x-small",variant:"tonal",color:"info"},{default:i(()=>[o(r(a),1)]),_:2},1024))),128)),ee.value?(l(),u(d,{key:0,size:"x-small",variant:"outlined",color:"info"},{default:i(()=>[o(" и ещё "+r(ee.value)+" — GET /api/ai-models ",1)]),_:1})):q("",!0)])]),_:1}),s(G,{examples:b.multimodal,"tab-key":"multi","active-lang":V.value,"copied-key":y.value,"onUpdate:activeLang":e[5]||(e[5]=a=>V.value=a),onCopy:v},null,8,["examples","active-lang","copied-key"]),e[33]||(e[33]=t("h4",{class:"text-subtitle-2 font-weight-bold mt-4 mb-2"}," Пример ответа ",-1)),t("div",Qe,[s(k,{class:"copy-btn",size:"x-small",variant:"text",icon:"mdi-content-copy",title:y.value==="multi-resp"?"Скопировано":"Скопировать",onClick:e[6]||(e[6]=a=>v(b.multimodal.response,"multi-resp"))},null,8,["title"]),t("pre",null,r(b.multimodal.response),1)])]),_:1}),s($,{value:"image"},{default:i(()=>[s(E,{type:"info",variant:"tonal",density:"compact",class:"mb-4"},{default:i(()=>[e[34]||(e[34]=t("div",{class:"mb-2"}," Генерация изображений по промпту. ",-1)),e[35]||(e[35]=t("div",{class:"text-caption font-weight-medium mb-1"}," Модели: ",-1)),t("div",Ze,[(l(!0),f(_,null,x(we.value,a=>(l(),u(d,{key:a,size:"x-small",variant:"tonal",color:"info"},{default:i(()=>[o(r(a),1)]),_:2},1024))),128)),ae.value?(l(),u(d,{key:0,size:"x-small",variant:"outlined",color:"info"},{default:i(()=>[o(" и ещё "+r(ae.value)+" — GET /api/ai-models/images ",1)]),_:1})):q("",!0)]),e[36]||(e[36]=t("div",{class:"text-caption font-weight-medium mb-1"}," aspect_ratio: ",-1)),t("div",Xe,[(l(),f(_,null,x(Ae,a=>s(d,{key:a.ratio,size:"x-small",variant:"outlined"},{default:i(()=>[o(r(a.ratio)+" → "+r(a.size),1)]),_:2},1024)),64))]),e[37]||(e[37]=t("div",{class:"text-caption font-weight-medium mb-1"}," image_size: ",-1)),t("div",et,[(l(),f(_,null,x(qe,a=>s(d,{key:a.size,size:"x-small",variant:"outlined"},{default:i(()=>[o(r(a.size)+" — "+r(a.label),1)]),_:2},1024)),64))])]),_:1}),s(G,{examples:b.image,"tab-key":"image","active-lang":J.value,"copied-key":y.value,"onUpdate:activeLang":e[7]||(e[7]=a=>J.value=a),onCopy:v},null,8,["examples","active-lang","copied-key"]),e[38]||(e[38]=t("h4",{class:"text-subtitle-2 font-weight-bold mt-4 mb-2"}," Пример ответа ",-1)),t("div",tt,[s(k,{class:"copy-btn",size:"x-small",variant:"text",icon:"mdi-content-copy",title:y.value==="image-resp"?"Скопировано":"Скопировать",onClick:e[8]||(e[8]=a=>v(b.image.response,"image-resp"))},null,8,["title"]),t("pre",null,r(b.image.response),1)])]),_:1}),s($,{value:"tools"},{default:i(()=>[s(E,{type:"info",variant:"tonal",density:"compact",class:"mb-4"},{default:i(()=>[e[39]||(e[39]=t("div",{class:"mb-2"}," Описание функций, которые модель может вызвать для получения данных. ",-1)),e[40]||(e[40]=t("div",{class:"text-caption font-weight-medium mb-1"}," Поддерживаемые модели: ",-1)),t("div",at,[(l(!0),f(_,null,x(ze.value,a=>(l(),u(d,{key:a,size:"x-small",variant:"tonal",color:"info"},{default:i(()=>[o(r(a),1)]),_:2},1024))),128))])]),_:1}),s(G,{examples:b.tools,"tab-key":"tools","active-lang":F.value,"copied-key":y.value,"onUpdate:activeLang":e[9]||(e[9]=a=>F.value=a),onCopy:v},null,8,["examples","active-lang","copied-key"]),e[41]||(e[41]=t("h4",{class:"text-subtitle-2 font-weight-bold mt-4 mb-2"}," Пример ответа (вызов функции) ",-1)),t("div",it,[s(k,{class:"copy-btn",size:"x-small",variant:"text",icon:"mdi-content-copy",title:y.value==="tools-resp"?"Скопировано":"Скопировать",onClick:e[10]||(e[10]=a=>v(b.tools.response,"tools-resp"))},null,8,["title"]),t("pre",null,r(b.tools.response),1)])]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1}),e[49]||(e[49]=t("h2",{class:"text-h5 font-weight-bold mb-4"}," Эндпоинты ",-1)),(l(!0),f(_,null,x(P.value,a=>(l(),u(I,{id:a.path.replace("#",""),key:a.path,variant:"outlined",class:"mb-6 endpoint-card"},{default:i(()=>[s(C,null,{default:i(()=>[t("div",st,[s(d,{color:N(a.method),variant:"flat",label:"",class:"font-weight-bold method-chip"},{default:i(()=>[o(r(a.method),1)]),_:2},1032,["color"]),t("code",ot,r(a.url),1),s(je),s(k,{size:"x-small",variant:"text",icon:"mdi-content-copy",title:y.value===a.path?"Скопировано":"Скопировать URL",onClick:m=>v(a.url,a.path)},null,8,["title","onClick"])]),t("div",nt,r(a.shortTitle),1),t("p",lt,r(a.description),1),t("div",rt,[e[43]||(e[43]=t("h3",{class:"text-subtitle-2 font-weight-bold mb-0"}," Параметры запроса ",-1)),a.in?(l(),u(d,{key:0,size:"x-small",variant:"flat",class:"ctype-chip"},{default:i(()=>[o(r(a.in),1)]),_:2},1024)):q("",!0)]),a.parameters&&a.parameters.length?(l(),u(ce,{key:0,density:"comfortable",class:"params-table mb-4"},{default:i(()=>[e[46]||(e[46]=t("thead",null,[t("tr",null,[t("th",null,"Параметр"),t("th",null,"Тип"),t("th",null,"Обязательный"),t("th",null,"По умолчанию"),t("th",null,"Описание")])],-1)),t("tbody",null,[(l(!0),f(_,null,x(a.parameters,m=>(l(),f("tr",{key:m.name},[t("td",pt,[t("code",null,r(m.name),1)]),t("td",ct,[t("span",dt,r(m.schema?.type),1)]),t("td",mt,[m.required&&m.required_variant?(l(),u(d,{key:0,size:"x-small",color:"warning",variant:"flat"},{default:i(()=>[...e[44]||(e[44]=[o(" на выбор ",-1)])]),_:1})):m.required?(l(),u(d,{key:1,size:"x-small",color:"error",variant:"flat"},{default:i(()=>[...e[45]||(e[45]=[o(" required ",-1)])]),_:1})):(l(),f("span",ut," — "))]),t("td",gt,[m.default!==void 0&&m.default!==""&&m.default!==null?(l(),f("code",ht,r(m.default),1)):(l(),f("span",ft,"—"))]),t("td",yt,r(m.description),1)]))),128))])]),_:2},1024)):(l(),f("p",bt," Параметры отсутствуют ")),e[47]||(e[47]=t("h3",{class:"text-subtitle-2 font-weight-bold mt-4 mb-2"}," Ответы ",-1)),s(pe,{variant:"accordion",class:"response-panels"},{default:i(()=>[(l(!0),f(_,null,x(a.responses,(m,j)=>(l(),u(re,{key:j},{default:i(()=>[s(g,null,{default:i(()=>[s(d,{color:ie(String(j)),size:"small",variant:"flat",label:"",class:"me-3"},{default:i(()=>[o(r(j),1)]),_:2},1032,["color"]),o(" "+r(m.description),1)]),_:2},1024),m.content?(l(),u(le,{key:0},{default:i(()=>[t("div",vt,[s(k,{class:"copy-btn",size:"x-small",variant:"text",icon:"mdi-content-copy",title:y.value===`${a.path}-${j}`?"Скопировано":"Скопировать",onClick:wt=>v(JSON.stringify(m.content,null,2),`${a.path}-${j}`)},null,8,["title","onClick"]),t("pre",null,r(JSON.stringify(m.content,null,2)),1)])]),_:2},1024)):q("",!0)]),_:2},1024))),128))]),_:2},1024)]),_:2},1024)]),_:2},1032,["id"]))),128))]),_:1}),ue(D)?q("",!0):(l(),u(de,{key:0,cols:"3",lg:"3",class:"d-none d-md-block"},{default:i(()=>[t("div",_t,[e[50]||(e[50]=t("div",{class:"text-subtitle-2 font-weight-bold mb-3"}," На этой странице ",-1)),s(ne,{density:"compact",class:"bg-transparent toc-list"},{default:i(()=>[(l(!0),f(_,null,x(P.value,a=>(l(),u(oe,{key:a.path,title:a.shortTitle,active:W.value===a.path,"active-color":"primary",onClick:m=>se(a.path)},{prepend:i(()=>[s(d,{color:N(a.method),size:"x-small",variant:"flat",label:"",class:"me-2 method-chip toc-method"},{default:i(()=>[o(r(a.method),1)]),_:2},1032,["color"])]),_:2},1032,["title","active","onClick"]))),128))]),_:1})])]),_:1}))]),_:1})]),_:1})}}},Et=Le(kt,[["__scopeId","data-v-be738d8c"]]);export{Et as default};
