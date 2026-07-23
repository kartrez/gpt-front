import{_ as ge}from"./D8E2oNn7.js";import{_ as he,x as fe,s as ye,y as ve,B as be,o as _e,l as u,g as o,e as k,r,a as n,f as i,m as O,b as t,c as d,u as L,h as s,t as l,F as b,i as _,p as xe,R as w}from"./D5ADCFoZ.js";import{u as ke}from"./CO1sG9Q3.js";const we={class:"d-flex flex-column flex-md-row align-md-center ga-4"},Te={class:"flex-shrink-0"},Ae={class:"text-body-1 mb-3"},qe={class:"code-block position-relative"},ze={class:"code-block position-relative"},Pe={class:"d-flex flex-wrap ga-1"},Ce={class:"code-block position-relative"},Ie={class:"d-flex flex-wrap mb-3 ga-1"},Re={class:"d-flex flex-wrap mb-3 ga-1"},je={class:"d-flex flex-wrap ga-1"},Oe={class:"code-block position-relative"},Se={class:"d-flex flex-wrap ga-1"},Ee={class:"code-block position-relative"},Le={class:"d-flex flex-wrap align-center mb-3 ga-2"},Ke={class:"endpoint-url"},Ue={class:"text-subtitle-1 font-weight-medium mb-1"},Ge={class:"text-body-2 text-medium-emphasis mb-4"},$e={class:"d-flex align-center mb-2 ga-2"},Be={"data-label":"Параметр"},Ye={"data-label":"Тип"},He={class:"text-body-2 text-medium-emphasis"},Ne={"data-label":"Обязательный"},De={key:2,class:"text-caption text-medium-emphasis"},Je={"data-label":"По умолчанию"},Ve={key:0},Fe={key:1,class:"text-caption text-medium-emphasis"},Me={"data-label":"Описание",class:"text-body-2"},We={key:1,class:"text-body-2 text-medium-emphasis mb-4"},Qe={class:"code-block position-relative"},Ze={class:"toc-sticky position-sticky overflow-y-auto pl-4"},Xe={__name:"doc-api",setup(et){fe({title:"API документация - GPT-Chat",description:"Документация API GPT-Chat. Информация о доступе к API, эндпоинтах, форматах запросов и ответов для интеграции с нашими сервисами.",keywords:"API, документация, интеграция, эндпоинты, разработка, GPT-Chat API",robots:"index, follow"});const Q=ye(),Z=ke(),X=xe(()=>Z.value&&Q.loggedIn),{mobile:K}=ve(),q=k("text"),U=k("curl"),G=k("curl"),$=k("curl"),B=k("curl"),m=k(null),Y=k(null),ee=["google/gemini-3-flash","google/gemini-3.1-pro","qwen/plus-3.6","anthropic/claude-sonnet-4.6","openai/gpt-5.4"],te=["google/gemini-2.5-flash-image","google/gemini-3-flash-image","google/gemini-3.1-flash-image-preview","openai/gpt-5.4-image-2"],ae=[{ratio:"1:1",size:"1024×1024"},{ratio:"2:3",size:"832×1248"},{ratio:"3:2",size:"1248×832"},{ratio:"3:4",size:"864×1184"},{ratio:"4:3",size:"1184×864"},{ratio:"4:5",size:"896×1152"},{ratio:"5:4",size:"1152×896"},{ratio:"9:16",size:"768×1344"},{ratio:"16:9",size:"1344×768"},{ratio:"21:9",size:"1536×672"}],ie=[{size:"1K",label:"стандарт"},{size:"2K",label:"высокое"},{size:"4K",label:"максимум"}],oe=["qwen/turbo","qwen/plus","qwen/max","google/gemini-3-flash","deepseek/deepseek-v3.2","anthropic/claude-sonnet-4.6"],h={text:{curl:`curl https://api.gpt-chat.by/api/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "model": "qwen/turbo",
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
    "model": "qwen/turbo",
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
    "model" => "qwen/turbo",
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
    model: "qwen/turbo",
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
}`}},T=k([{path:"#chat-completions",shortTitle:"Chat completions",method:"POST",title:"Получить ответ от AI модели",description:"Отправляет сообщения в AI модель и возвращает ответ. Совместимо с OpenAI Chat Completions API.",url:"https://api.gpt-chat.by/api/chat/completions",in:"json/body",parameters:[{name:"messages",description:"Массив сообщений, формирующих диалог. Поддерживает текст, изображения и вызов инструментов.",required:!0,default:"",schema:{type:"array"}},{name:"model",description:"Слаг модели AI (например, qwen/turbo, anthropic/claude-opus-4.7, kwaipilot/kat-coder-pro). Полный список слагов — на /pricing или через GET /api/ai-models.",required:!1,default:"qwen/turbo",schema:{type:"string"}},{name:"collectionId",description:"Идентификатор коллекции RAG для использования ваших документов",required:!1,default:"",schema:{type:"uuid"}},{name:"temperature",description:"Температура генерации (0.1 — 1.0)",required:!1,default:"0.1",schema:{type:"number"}},{name:"stream",description:"Использовать потоковую передачу данных",required:!1,default:"false",schema:{type:"boolean"}},{name:"thinking",description:"Включить режим глубоких размышлений (для поддерживаемых моделей)",required:!1,default:"false",schema:{type:"boolean"}},{name:"enableSearch",description:"Включить поиск в интернете перед ответом (для поддерживаемых моделей)",required:!1,default:"false",schema:{type:"boolean"}},{name:"assistantId",description:"Идентификатор вашего кастомного ассистента (персоны) — подставляет его системный промпт",required:!1,default:null,schema:{type:"uuid"}},{name:"useMemory",description:"Использовать долговременную память пользователя и сохранённые инструкции в контексте ответа",required:!1,default:"true",schema:{type:"boolean"}},{name:"imageConfig",description:"Настройки выходной картинки для chat-capable image-моделей. Объект с полями aspect_ratio (1:1, 2:3, 3:2, 3:4, 4:3, 4:5, 5:4, 9:16, 16:9, 21:9) и image_size (0.5K, 1K, 2K, 4K). modalities выставляются автоматически по модели.",required:!1,default:null,schema:{type:"object"}},{name:"tools",description:"Список инструментов (функций), которые может вызывать модель",required:!1,default:null,schema:{type:"array"}}],responses:{200:{description:"Успешный ответ от AI модели",content:{id:"chatcmpl-9d9aacd0-b2e2-9f4c-a267-2a43e3ad3bd8",object:"chat.completion",created:1754499895,usage:{prompt_tokens:384,completion_tokens:552,total_tokens:936},choices:[{message:{role:"assistant",content:"Если ты хочешь что то узнать — просто скажи! 😺"},finish_reason:"stop",index:0,logprobs:null}],cost:4536e-7}},400:{description:"Некорректный запрос"},401:{description:"Не авторизован"},402:{description:"Недостаточно средств на балансе"},422:{description:"Не верные параметры запроса"},500:{description:"Внутренняя ошибка сервера"}}},{path:"#chat-image-generate",shortTitle:"Сгенерировать изображение",method:"POST",title:"Генерация изображения по промпту",description:"Стоимость зависит от выбранной модели (обычно ~$0.04–0.20 за изображение). Списывается с баланса.",url:"https://api.gpt-chat.by/api/chat/image",in:"json/body",parameters:[{name:"prompt",description:"Текстовое описание желаемого изображения (1—2000 символов)",required:!0,schema:{type:"string"}},{name:"model",description:"Слаг image-модели: google/gemini-2.5-flash-image, google/gemini-3-flash-image, google/gemini-3.1-flash-image-preview, openai/gpt-5.4-image-2 и др.",required:!1,default:"google/gemini-2.5-flash-image",schema:{type:"string"}},{name:"aspectRatio",description:"Соотношение сторон: 1:1, 2:3, 3:2, 3:4, 4:3, 4:5, 5:4, 9:16, 16:9, 21:9. Если не указано — решает модель.",required:!1,default:null,schema:{type:"string"}},{name:"imageSize",description:"Разрешение: 1K, 2K, 4K. Зависит от модели (для google/gemini-2.5-flash-image доступно только 1K).",required:!1,default:null,schema:{type:"string"}}],responses:{200:{description:"Изображение сгенерировано",content:{image:"data:image/jpeg;base64,/9j/4AAQSkZJRg...",balance:12.34,isFree:!1}},400:{description:"Некорректный запрос"},401:{description:"Не авторизован"},402:{description:"Недостаточно средств на балансе"},422:{description:"Не верные параметры запроса"},500:{description:"Внутренняя ошибка сервера"}}},{path:"#chat-image-edit",shortTitle:"Отредактировать изображение",method:"POST",title:"Редактирование изображения по промпту",description:"Принимает одно (image) или несколько (images[], до 3) исходных изображений и текстовое описание правки. Стоимость ~$0.11.",url:"https://api.gpt-chat.by/api/chat/image/edit",in:"multipart/form-data",parameters:[{name:"prompt",description:"Описание правки (5—600 символов)",required:!0,schema:{type:"string"}},{name:"image",description:"Одно исходное изображение (JPG, PNG, WebP), максимум 10 МБ",required:!0,required_variant:!0,schema:{type:"file"}},{name:"images[]",description:"Несколько исходных изображений (JPG, PNG, WebP), до 3 файлов, каждый ≤10 МБ. Используйте вместо image для мультиизображений.",required:!0,required_variant:!0,schema:{type:"file[]"}},{name:"model",description:"Слаг image-модели для редактирования",required:!1,default:"google/gemini-2.5-flash-image",schema:{type:"string"}}],responses:{200:{description:"Изображение успешно отредактировано",content:{image:"data:image/jpeg;base64,/9j/4AAQSkZJRg...",balance:12.23,isFree:!1}},400:{description:"Некорректный запрос (формат, размер, длина prompt)"},401:{description:"Не авторизован"},402:{description:"Недостаточно средств на балансе"},500:{description:"Внутренняя ошибка сервера"}}},{path:"#chat-video-generate",shortTitle:"Сгенерировать видео",method:"POST",title:"Генерация видео из текста (асинхронно)",description:"Возвращает taskId для поллинга через GET /api/chat/video/status/{taskId}. Длительность, разрешение и стоимость зависят от выбранной модели.",url:"https://api.gpt-chat.by/api/chat/video",in:"json/body",parameters:[{name:"prompt",description:"Текстовое описание видео (1—2000 символов)",required:!0,schema:{type:"string"}},{name:"model",description:"Слаг видео-модели: alibaba/wan-2.6, alibaba/wan-2.7, google/veo-3.1, google/veo-3.1-fast, bytedance/seedance-2.0, bytedance/seedance-2.0-fast, openai/sora-2-pro, kwaivgi/kling-v3.0-pro, kwaivgi/kling-v3.0-std, x-ai/grok-imagine-video.",required:!1,default:"alibaba/wan-2.6",schema:{type:"string"}},{name:"resolution",description:"Разрешение: 480p, 720p, 1080p. Набор зависит от модели; если не указано — берётся дефолт модели.",required:!1,default:null,schema:{type:"string"}},{name:"duration",description:"Длительность в секундах. Допустимые значения зависят от модели; если не указано — дефолт модели.",required:!1,default:null,schema:{type:"integer"}}],responses:{200:{description:"Задача поставлена в очередь",content:{taskId:"b3a1c0d2-3e4f-5a6b-7c8d-9e0f1a2b3c4d",status:"pending"}},401:{description:"Не авторизован"},402:{description:"Недостаточно средств"},422:{description:"Не верные параметры запроса"},500:{description:"Внутренняя ошибка сервера"}}},{path:"#chat-video-from-image",shortTitle:"Видео из изображения",method:"POST",title:"Генерация видео из изображения (асинхронно)",description:"Принимает исходное изображение и описание движения. Возвращает taskId для поллинга. Стоимость зависит от выбранной модели.",url:"https://api.gpt-chat.by/api/chat/video/image",in:"multipart/form-data",parameters:[{name:"image",description:"Исходный файл (JPG, PNG, WebP), максимум 10 МБ",required:!0,schema:{type:"file"}},{name:"prompt",description:"Описание желаемого движения/анимации (5—600 символов)",required:!0,schema:{type:"string"}},{name:"model",description:"Слаг видео-модели с поддержкой image-to-video: alibaba/wan-2.6, alibaba/wan-2.7, google/veo-3.1, google/veo-3.1-fast, bytedance/seedance-2.0, openai/sora-2-pro, kwaivgi/kling-v3.0-pro и др.",required:!1,default:"alibaba/wan-2.6",schema:{type:"string"}},{name:"resolution",description:"Разрешение: 480p, 720p, 1080p. Набор зависит от модели; если не указано — дефолт модели.",required:!1,default:null,schema:{type:"string"}},{name:"duration",description:"Длительность в секундах. Допустимые значения зависят от модели; если не указано — дефолт модели.",required:!1,default:null,schema:{type:"integer"}}],responses:{200:{description:"Задача поставлена в очередь",content:{taskId:"b3a1c0d2-3e4f-5a6b-7c8d-9e0f1a2b3c4d",status:"pending"}},400:{description:"Некорректный запрос (формат, размер, длина prompt)"},401:{description:"Не авторизован"},402:{description:"Недостаточно средств"},500:{description:"Внутренняя ошибка сервера"}}},{path:"#chat-video-status",shortTitle:"Статус видео-задачи",method:"GET",title:"Получить статус генерации видео",description:'Поллинг задачи. Когда status="done", в первом ответе вернётся base64-видео и обновлённый баланс. Дальше задача считается доставленной.',url:"https://api.gpt-chat.by/api/chat/video/status/{taskId}",in:"path/string",parameters:[{name:"taskId",in:"path",description:"Идентификатор задачи, полученный при вызове /chat/video или /chat/video/image",required:!0,schema:{type:"string"}}],responses:{200:{description:"Готово (первая успешная доставка)",content:{status:"done",video:"data:video/mp4;base64,AAAAIGZ0eXBpc29t...",balance:11.83}},202:{description:"В процессе (продолжайте поллинг)",content:{status:"pending"}},403:{description:"Задача принадлежит другому пользователю"},404:{description:"Задача не найдена или истёк срок хранения (1 час)"},500:{description:"Внутренняя ошибка сервера"}}},{path:"#chat-voice-transcribe",shortTitle:"Распознать речь",method:"POST",title:"Распознавание речи (Speech-to-Text)",description:"Принимает короткое аудио (≤1 МБ, ~60 секунд). Rate-limited.",url:"https://api.gpt-chat.by/api/chat/voice/transcribe",in:"multipart/form-data",parameters:[{name:"voice",description:"Аудиофайл (webm, ogg, mp3, wav, mp4, m4a), максимум 1 МБ",required:!0,schema:{type:"file"}}],responses:{200:{description:"Распознанный текст",content:{text:"Привет, как дела?"}},400:{description:"Некорректный файл, неподдерживаемый формат или речь не распознана"},401:{description:"Не авторизован"},429:{description:"Слишком много запросов подряд"}}},{path:"#chat-audio-generate",shortTitle:"Сгенерировать аудио",method:"POST",title:"Генерация аудио (Text-to-Speech)",description:"Озвучивает текст или генерирует аудио по описанию. Возвращает аудио как data-URL и ссылку на файл, а также транскрипт. Списывает баланс согласно длительности и модели.",url:"https://api.gpt-chat.by/api/chat/audio",in:"json/body",parameters:[{name:"prompt",description:"Текст для озвучивания или описание для генерации аудио (от 1 до 4000 символов)",required:!0,schema:{type:"string"}},{name:"model",description:"Модель генерации: openai/gpt-audio-mini, openai/gpt-audio, openai/gpt-4o-audio-preview, google/lyria-3-pro-preview, google/lyria-3-clip-preview",required:!1,default:"openai/gpt-audio-mini",schema:{type:"string"}},{name:"voice",description:"Голос озвучивания для моделей OpenAI: alloy, ash, ballad, coral, echo, fable, onyx, nova, sage, shimmer, verse. Если не указан — используется alloy",required:!1,default:"alloy",schema:{type:"string"}},{name:"duration",description:"Длительность аудио в секундах (до 300; для каждой модели свой максимум)",required:!1,default:"30",schema:{type:"number"}},{name:"format",description:"Формат выходного аудио: mp3, wav, opus, flac",required:!1,default:"mp3",schema:{type:"string"}},{name:"imageUrl",description:"Ссылка на изображение-референс (поддерживается только моделями Google Lyria)",required:!1,schema:{type:"url"}}],responses:{200:{description:"Аудио успешно сгенерировано",content:{audio:"data:audio/mpeg;base64,SUQzBAAA...",url:"https://api.gpt-chat.by/uploads/audio/019883b7-146e-713f-a102-25428208a460.mp3",transcript:"Привет, как дела?",balance:12.34,isFree:!1}},400:{description:"Некорректный запрос или неизвестная модель"},401:{description:"Не авторизован"},402:{description:"Недостаточно средств"},422:{description:"Не верные параметры запроса"},500:{description:"Внутренняя ошибка сервера"}}},{path:"#chat-file-extract",shortTitle:"Извлечь текст из файла",method:"POST",title:"Извлечение текста из документа",description:"Принимает документ и возвращает извлечённый текст. Текст обрезается до 200 000 символов.",url:"https://api.gpt-chat.by/api/chat/file/extract",in:"multipart/form-data",parameters:[{name:"file",description:"Документ: txt, csv, pdf, doc, docx, odt, xls, xlsx, html, htm. Максимум 10 МБ",required:!0,schema:{type:"file"}}],responses:{200:{description:"Текст извлечён",content:{filename:"report.pdf",extension:"pdf",sizeBytes:524288,text:"Содержимое документа...",charCount:12345,isTruncated:!1}},400:{description:"Некорректный файл, неподдерживаемое расширение или ошибка извлечения"},401:{description:"Не авторизован"}}},{path:"#rag-collections-create",shortTitle:"RAG: создать коллекцию",method:"POST",title:"Создать коллекцию RAG",description:"Создает новую коллекцию для возможности дообучения модели на ваших документах",url:"https://api.gpt-chat.by/api/rag/collections",in:"json/body",parameters:[{name:"name",description:"Название коллекции",required:!0,schema:{type:"string"}}],responses:{201:{description:"Коллекция успешно создана",content:{documents:[],id:"019883b7-146e-713f-a102-25428208a460",name:"Default Collection"}},400:{description:"Некорректный запрос"},401:{description:"Не авторизован"},422:{description:"Не верные параметры запроса"},500:{description:"Внутренняя ошибка сервера"}}},{path:"#rag-collections-list",shortTitle:"RAG: список коллекций",method:"GET",title:"Получить список коллекций RAG",description:"Возвращает список всех коллекций текущего пользователя",url:"https://api.gpt-chat.by/api/rag/collections",in:"",parameters:[],responses:{200:{description:"Список коллекций",content:[{documents:[{id:"01988413-2557-7228-af02-6c3b8aae4635",name:"https://testy.com/",size:"83",type:"html"}],id:"019883b7-146e-713f-a102-25428208a460",name:"Default Collection"},{documents:[],id:"019883b7-146e-713f-a102-25428208a460",name:"Default Collection 2"},{documents:[],id:"019883b7-146e-713f-a102-25428208a460",name:"Default Collection 3"}]},401:{description:"Неавторизован"}}},{path:"#rag-collections-item",shortTitle:"RAG: получить коллекцию",method:"GET",title:"Получить информацию о коллекции RAG",description:"Возвращает информацию о конкретной коллекции",url:"https://api.gpt-chat.by/api/rag/collections/{collectionId}",in:"path/string",parameters:[{name:"collectionId",required:!0,schema:{type:"uuid"},description:"Идентификатор коллекции"}],responses:{200:{description:"Информация о коллекции",content:{documents:[{id:"01988413-2557-7228-af02-6c3b8aae4635",name:"https://testy.com/",size:"83",type:"html"}],id:"019883b7-146e-713f-a102-25428208a460",name:"Default Collection"}},401:{description:"Неавторизован"},404:{description:"Коллекция не найдена"}}},{path:"#rag-collections-update",shortTitle:"RAG: изменить коллекцию",method:"PUT",title:"Изменить коллекцию RAG",description:"Обновляет название коллекции и, при необходимости, привязывает Telegram-бота",url:"https://api.gpt-chat.by/api/rag/collections/{collectionId}",in:"json/body + path/string",parameters:[{name:"collectionId",in:"path",required:!0,schema:{type:"uuid"},description:"Идентификатор коллекции"},{name:"name",in:"body",required:!1,schema:{type:"string"},description:"Новое название коллекции"},{name:"telegramToken",in:"body",required:!1,schema:{type:"string"},description:"Токен Telegram-бота вида <bot_id>:<token> для отправки уведомлений"}],responses:{200:{description:"Коллекция успешно обновлена",content:{id:"019883b7-146e-713f-a102-25428208a460",name:"Support FAQ collection",telegramBotName:"SupportHelperBot",documents:[]}},400:{description:"Некорректный запрос"},401:{description:"Неавторизован"},404:{description:"Коллекция не найдена"},422:{description:"Не верные параметры запроса"},500:{description:"Внутренняя ошибка сервера"}}},{path:"#rag-collections-delete",shortTitle:"RAG: удалить коллекцию",method:"DELETE",title:"Удалить коллекцию RAG",description:"Удаляет коллекцию и все связанные с ней документы",url:"https://api.gpt-chat.by/api/rag/collections/{collectionId}",in:"path/string",parameters:[{name:"collectionId",required:!0,schema:{type:"uuid"},description:"Идентификатор коллекции"}],responses:{204:{description:"Коллекция успешно удалена"},401:{description:"Неавторизован"},404:{description:"Коллекция не найдена"},500:{description:"Внутренняя ошибка сервера"}}},{path:"#rag-collections-documents-create",shortTitle:"RAG: загрузить документ",method:"POST",title:"Загрузить документ в коллекцию RAG",description:"Добавляет новый документ в указанную коллекцию",url:"https://api.gpt-chat.by/api/rag/collections/{collectionId}/documents",in:"multipart/form-data + path/string",parameters:[{name:"collectionId",in:"path",required:!0,schema:{type:"uuid"},description:"Идентификатор коллекции"},{name:"url",required:!0,required_variant:!0,schema:{type:"url"},description:"Ссылка на интернет ресурс (имя документа берётся из URL)"},{name:"file",required:!0,required_variant:!0,schema:{type:"file"},description:"Файл: txt, pdf, doc, docx, odt, xls, xlsx, csv, html, htm. Максимум 50 MB (имя документа берётся из имени файла)"}],responses:{201:{description:"Документ успешно добавлен",content:{id:"01988413-2557-7228-af02-6c3b8aae4635"}},400:{description:"Некорректный запрос"},401:{description:"Неавторизован"},404:{description:"Коллекция не найдена"},422:{description:"Не верные параметры запроса"},500:{description:"Внутренняя ошибка сервера"}}},{path:"#rag-collections-documents-delete",shortTitle:"RAG: удалить документ",method:"DELETE",title:"Удалить документ из коллекции RAG",description:"Удаляет конкретный документ из коллекции",url:"https://api.gpt-chat.by/api/rag/collections/{collectionId}/documents/{documentId}",in:"json/body + path/string",parameters:[{name:"collectionId",in:"path",required:!0,schema:{type:"uuid"},description:"Идентификатор коллекции"},{name:"documentId",in:"path",required:!0,schema:{type:"uuid"},description:"Идентификатор документа"}],responses:{204:{description:"Документ успешно удален"},401:{description:"Неавторизован"},404:{description:"Документ не найден"},500:{description:"Внутренняя ошибка сервера"}}}]),S=p=>({GET:"success",POST:"info",PUT:"warning",DELETE:"error",PATCH:"primary"})[p]||"default",se=p=>p.startsWith("2")?"success":p.startsWith("4")?"warning":p.startsWith("5")?"error":"default",H=p=>{const e=document.getElementById(p.replace("#",""));e&&e.scrollIntoView({behavior:"smooth",block:"start"})},f=async(p,e)=>{try{await navigator.clipboard.writeText(p),m.value=e,setTimeout(()=>{m.value===e&&(m.value=null)},1500)}catch(y){console.error("Clipboard error",y)}},E=()=>{let e=null;for(const y of T.value){const v=document.getElementById(y.path.replace("#",""));if(!v)continue;v.getBoundingClientRect().top-120<=0&&(e=y.path)}Y.value=e},z={props:["examples","tabKey","activeLang","copiedKey"],emits:["update:activeLang","copy"],setup(p,{emit:e}){const y=[{value:"curl",label:"cURL"},{value:"python",label:"Python"},{value:"php",label:"PHP"},{value:"js",label:"JS"}];return()=>w("div",[w("div",{class:"d-flex flex-wrap mb-2",style:"gap: 4px;"},y.map(v=>w(r("v-btn"),{size:"small",variant:p.activeLang===v.value?"tonal":"text",color:p.activeLang===v.value?"primary":void 0,onClick:()=>e("update:activeLang",v.value)},()=>v.label))),w("div",{class:"code-block position-relative"},[w(r("v-btn"),{class:"copy-btn",size:"x-small",variant:"text",icon:"mdi-content-copy",title:p.copiedKey===`${p.tabKey}-${p.activeLang}`?"Скопировано":"Скопировать",onClick:()=>e("copy",p.examples[p.activeLang],`${p.tabKey}-${p.activeLang}`)}),w("pre",p.examples[p.activeLang])])])}};return be(()=>{window.addEventListener("scroll",E,{passive:!0}),E()}),_e(()=>{window.removeEventListener("scroll",E)}),(p,e)=>{const y=r("v-icon"),v=r("v-expansion-panel-title"),g=r("v-chip"),N=r("v-list-item"),D=r("v-list"),J=r("v-expansion-panel-text"),V=r("v-expansion-panel"),F=r("v-expansion-panels"),ne=r("v-avatar"),x=r("v-btn"),P=r("v-card-text"),C=r("v-card"),M=r("v-card-title"),le=ge,I=r("v-tab"),re=r("v-tabs"),R=r("v-alert"),j=r("v-window-item"),pe=r("v-window"),ce=r("v-spacer"),de=r("v-table"),W=r("v-col"),me=r("v-row"),ue=r("v-container");return n(),u(ue,{fluid:"",class:"pa-4 pa-md-6 doc-api-page"},{default:o(()=>[i(me,null,{default:o(()=>[i(W,{cols:"12",md:"9",lg:"9"},{default:o(()=>[e[43]||(e[43]=t("div",{class:"mb-6"},[t("h1",{class:"text-h4 text-md-h3 font-weight-bold mb-2"}," Документация API "),t("p",{class:"text-body-1 text-medium-emphasis"}," REST API для работы с чат-ботами и RAG-системой. Совместимо с OpenAI Chat Completions. ")],-1)),L(K)?(n(),u(F,{key:0,class:"mb-6"},{default:o(()=>[i(V,null,{default:o(()=>[i(v,null,{default:o(()=>[i(y,{icon:"mdi-format-list-bulleted",class:"me-2"}),s(" Содержание ("+l(T.value.length)+" эндпоинтов) ",1)]),_:1}),i(J,null,{default:o(()=>[i(D,{density:"compact",class:"pa-0"},{default:o(()=>[(n(!0),d(b,null,_(T.value,a=>(n(),u(N,{key:a.path,title:a.shortTitle,onClick:c=>H(a.path)},{prepend:o(()=>[i(g,{color:S(a.method),size:"x-small",variant:"flat",label:"",class:"me-2 method-chip"},{default:o(()=>[s(l(a.method),1)]),_:2},1032,["color"])]),_:2},1032,["title","onClick"]))),128))]),_:1})]),_:1})]),_:1})]),_:1})):O("",!0),i(C,{color:"primary",variant:"flat",class:"mb-6 keys-cta",rounded:"lg"},{default:o(()=>[i(P,{class:"pa-5 pa-md-6"},{default:o(()=>[t("div",we,[i(ne,{color:"white",size:"56",class:"flex-shrink-0"},{default:o(()=>[i(y,{icon:"mdi-key-plus",color:"primary",size:"32"})]),_:1}),e[13]||(e[13]=t("div",{class:"flex-grow-1"},[t("div",{class:"text-h6 font-weight-bold text-white mb-1"}," Начните с создания API ключа "),t("div",{class:"text-body-2 text-white",style:{opacity:"0.9"}},[s(" Все запросы авторизуются Bearer-токеном. Сгенерируйте ключ в личном кабинете и подставьте его в заголовок "),t("code",{class:"cta-code"},"Authorization"),s(". ")])],-1)),t("div",Te,[L(X)?(n(),u(x,{key:0,to:"/keys",color:"white",variant:"flat",size:"large","prepend-icon":"mdi-key-plus",class:"text-primary font-weight-bold"},{default:o(()=>[...e[11]||(e[11]=[s(" Создать ключ ",-1)])]),_:1})):(n(),u(x,{key:1,to:"/keys",color:"white",variant:"flat",size:"large","prepend-icon":"mdi-login",class:"text-primary font-weight-bold"},{default:o(()=>[...e[12]||(e[12]=[s(" Войти и создать ключ ",-1)])]),_:1}))])])]),_:1})]),_:1}),i(C,{variant:"outlined",class:"mb-6"},{default:o(()=>[i(M,{class:"text-h5 font-weight-bold"},{default:o(()=>[i(y,{icon:"mdi-key-outline",color:"primary",class:"me-2"}),e[14]||(e[14]=s(" Авторизация ",-1))]),_:1}),i(P,null,{default:o(()=>[t("p",Ae,[e[16]||(e[16]=s(" Все запросы используют Bearer-токен. Управление ключами — на странице ",-1)),i(le,{to:"/keys",class:"text-primary font-weight-medium"},{default:o(()=>[...e[15]||(e[15]=[s(" API Ключи ",-1)])]),_:1}),e[17]||(e[17]=s(". ",-1))]),t("div",qe,[i(x,{class:"copy-btn",size:"x-small",variant:"text",icon:"mdi-content-copy",title:m.value==="auth"?"Скопировано":"Скопировать",onClick:e[0]||(e[0]=a=>f("Authorization: Bearer YOUR_API_KEY","auth"))},null,8,["title"]),e[18]||(e[18]=t("pre",null,"Authorization: Bearer YOUR_API_KEY",-1))])]),_:1})]),_:1}),i(C,{variant:"outlined",class:"mb-6"},{default:o(()=>[i(M,{class:"text-h5 font-weight-bold"},{default:o(()=>[i(y,{icon:"mdi-message-text-outline",color:"primary",class:"me-2"}),e[19]||(e[19]=s(" Формирование сообщений ",-1))]),_:1}),i(P,null,{default:o(()=>[e[37]||(e[37]=t("p",{class:"text-body-1 mb-4"},[s(" Запросы строятся на основе массива "),t("code",null,"messages"),s(". Каждое сообщение имеет "),t("code",null,"role"),s(" (system/user/assistant) и "),t("code",null,"content"),s(". ")],-1)),i(re,{modelValue:q.value,"onUpdate:modelValue":e[1]||(e[1]=a=>q.value=a),color:"primary","show-arrows":""},{default:o(()=>[i(I,{value:"text"},{default:o(()=>[...e[20]||(e[20]=[s(" Текст ",-1)])]),_:1}),i(I,{value:"multimodal"},{default:o(()=>[...e[21]||(e[21]=[s(" Изображения на вход ",-1)])]),_:1}),i(I,{value:"image"},{default:o(()=>[...e[22]||(e[22]=[s(" Генерация ",-1)])]),_:1}),i(I,{value:"tools"},{default:o(()=>[...e[23]||(e[23]=[s(" Инструменты ",-1)])]),_:1})]),_:1},8,["modelValue"]),i(pe,{modelValue:q.value,"onUpdate:modelValue":e[10]||(e[10]=a=>q.value=a),class:"mt-4"},{default:o(()=>[i(j,{value:"text"},{default:o(()=>[i(R,{type:"info",variant:"tonal",density:"compact",class:"mb-4"},{default:o(()=>[...e[24]||(e[24]=[s(" Базовый пример отправки текстового сообщения. Текст поддерживают все модели. ",-1)])]),_:1}),i(z,{examples:h.text,"tab-key":"text","active-lang":U.value,"copied-key":m.value,"onUpdate:activeLang":e[2]||(e[2]=a=>U.value=a),onCopy:f},null,8,["examples","active-lang","copied-key"]),e[25]||(e[25]=t("h4",{class:"text-subtitle-2 font-weight-bold mt-4 mb-2"}," Пример ответа ",-1)),t("div",ze,[i(x,{class:"copy-btn",size:"x-small",variant:"text",icon:"mdi-content-copy",title:m.value==="text-resp"?"Скопировано":"Скопировать",onClick:e[3]||(e[3]=a=>f(h.text.response,"text-resp"))},null,8,["title"]),t("pre",null,l(h.text.response),1)])]),_:1}),i(j,{value:"multimodal"},{default:o(()=>[i(R,{type:"info",variant:"tonal",density:"compact",class:"mb-4"},{default:o(()=>[e[26]||(e[26]=t("div",{class:"mb-2"}," Передача изображений через URL и Base64. ",-1)),e[27]||(e[27]=t("div",{class:"text-caption font-weight-medium mb-1"}," Поддерживаемые модели: ",-1)),t("div",Pe,[(n(),d(b,null,_(ee,a=>i(g,{key:a,size:"x-small",variant:"tonal",color:"info"},{default:o(()=>[s(l(a),1)]),_:2},1024)),64))])]),_:1}),i(z,{examples:h.multimodal,"tab-key":"multi","active-lang":G.value,"copied-key":m.value,"onUpdate:activeLang":e[4]||(e[4]=a=>G.value=a),onCopy:f},null,8,["examples","active-lang","copied-key"]),e[28]||(e[28]=t("h4",{class:"text-subtitle-2 font-weight-bold mt-4 mb-2"}," Пример ответа ",-1)),t("div",Ce,[i(x,{class:"copy-btn",size:"x-small",variant:"text",icon:"mdi-content-copy",title:m.value==="multi-resp"?"Скопировано":"Скопировать",onClick:e[5]||(e[5]=a=>f(h.multimodal.response,"multi-resp"))},null,8,["title"]),t("pre",null,l(h.multimodal.response),1)])]),_:1}),i(j,{value:"image"},{default:o(()=>[i(R,{type:"info",variant:"tonal",density:"compact",class:"mb-4"},{default:o(()=>[e[29]||(e[29]=t("div",{class:"mb-2"}," Генерация изображений по промпту. ",-1)),e[30]||(e[30]=t("div",{class:"text-caption font-weight-medium mb-1"}," Модели: ",-1)),t("div",Ie,[(n(),d(b,null,_(te,a=>i(g,{key:a,size:"x-small",variant:"tonal",color:"info"},{default:o(()=>[s(l(a),1)]),_:2},1024)),64))]),e[31]||(e[31]=t("div",{class:"text-caption font-weight-medium mb-1"}," aspect_ratio: ",-1)),t("div",Re,[(n(),d(b,null,_(ae,a=>i(g,{key:a.ratio,size:"x-small",variant:"outlined"},{default:o(()=>[s(l(a.ratio)+" → "+l(a.size),1)]),_:2},1024)),64))]),e[32]||(e[32]=t("div",{class:"text-caption font-weight-medium mb-1"}," image_size: ",-1)),t("div",je,[(n(),d(b,null,_(ie,a=>i(g,{key:a.size,size:"x-small",variant:"outlined"},{default:o(()=>[s(l(a.size)+" — "+l(a.label),1)]),_:2},1024)),64))])]),_:1}),i(z,{examples:h.image,"tab-key":"image","active-lang":$.value,"copied-key":m.value,"onUpdate:activeLang":e[6]||(e[6]=a=>$.value=a),onCopy:f},null,8,["examples","active-lang","copied-key"]),e[33]||(e[33]=t("h4",{class:"text-subtitle-2 font-weight-bold mt-4 mb-2"}," Пример ответа ",-1)),t("div",Oe,[i(x,{class:"copy-btn",size:"x-small",variant:"text",icon:"mdi-content-copy",title:m.value==="image-resp"?"Скопировано":"Скопировать",onClick:e[7]||(e[7]=a=>f(h.image.response,"image-resp"))},null,8,["title"]),t("pre",null,l(h.image.response),1)])]),_:1}),i(j,{value:"tools"},{default:o(()=>[i(R,{type:"info",variant:"tonal",density:"compact",class:"mb-4"},{default:o(()=>[e[34]||(e[34]=t("div",{class:"mb-2"}," Описание функций, которые модель может вызвать для получения данных. ",-1)),e[35]||(e[35]=t("div",{class:"text-caption font-weight-medium mb-1"}," Поддерживаемые модели: ",-1)),t("div",Se,[(n(),d(b,null,_(oe,a=>i(g,{key:a,size:"x-small",variant:"tonal",color:"info"},{default:o(()=>[s(l(a),1)]),_:2},1024)),64))])]),_:1}),i(z,{examples:h.tools,"tab-key":"tools","active-lang":B.value,"copied-key":m.value,"onUpdate:activeLang":e[8]||(e[8]=a=>B.value=a),onCopy:f},null,8,["examples","active-lang","copied-key"]),e[36]||(e[36]=t("h4",{class:"text-subtitle-2 font-weight-bold mt-4 mb-2"}," Пример ответа (вызов функции) ",-1)),t("div",Ee,[i(x,{class:"copy-btn",size:"x-small",variant:"text",icon:"mdi-content-copy",title:m.value==="tools-resp"?"Скопировано":"Скопировать",onClick:e[9]||(e[9]=a=>f(h.tools.response,"tools-resp"))},null,8,["title"]),t("pre",null,l(h.tools.response),1)])]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1}),e[44]||(e[44]=t("h2",{class:"text-h5 font-weight-bold mb-4"}," Эндпоинты ",-1)),(n(!0),d(b,null,_(T.value,a=>(n(),u(C,{id:a.path.replace("#",""),key:a.path,variant:"outlined",class:"mb-6 endpoint-card"},{default:o(()=>[i(P,null,{default:o(()=>[t("div",Le,[i(g,{color:S(a.method),variant:"flat",label:"",class:"font-weight-bold method-chip"},{default:o(()=>[s(l(a.method),1)]),_:2},1032,["color"]),t("code",Ke,l(a.url),1),i(ce),i(x,{size:"x-small",variant:"text",icon:"mdi-content-copy",title:m.value===a.path?"Скопировано":"Скопировать URL",onClick:c=>f(a.url,a.path)},null,8,["title","onClick"])]),t("div",Ue,l(a.shortTitle),1),t("p",Ge,l(a.description),1),t("div",$e,[e[38]||(e[38]=t("h3",{class:"text-subtitle-2 font-weight-bold mb-0"}," Параметры запроса ",-1)),a.in?(n(),u(g,{key:0,size:"x-small",variant:"flat",class:"ctype-chip"},{default:o(()=>[s(l(a.in),1)]),_:2},1024)):O("",!0)]),a.parameters&&a.parameters.length?(n(),u(de,{key:0,density:"comfortable",class:"params-table mb-4"},{default:o(()=>[e[41]||(e[41]=t("thead",null,[t("tr",null,[t("th",null,"Параметр"),t("th",null,"Тип"),t("th",null,"Обязательный"),t("th",null,"По умолчанию"),t("th",null,"Описание")])],-1)),t("tbody",null,[(n(!0),d(b,null,_(a.parameters,c=>(n(),d("tr",{key:c.name},[t("td",Be,[t("code",null,l(c.name),1)]),t("td",Ye,[t("span",He,l(c.schema?.type),1)]),t("td",Ne,[c.required&&c.required_variant?(n(),u(g,{key:0,size:"x-small",color:"warning",variant:"flat"},{default:o(()=>[...e[39]||(e[39]=[s(" на выбор ",-1)])]),_:1})):c.required?(n(),u(g,{key:1,size:"x-small",color:"error",variant:"flat"},{default:o(()=>[...e[40]||(e[40]=[s(" required ",-1)])]),_:1})):(n(),d("span",De," — "))]),t("td",Je,[c.default!==void 0&&c.default!==""&&c.default!==null?(n(),d("code",Ve,l(c.default),1)):(n(),d("span",Fe,"—"))]),t("td",Me,l(c.description),1)]))),128))])]),_:2},1024)):(n(),d("p",We," Параметры отсутствуют ")),e[42]||(e[42]=t("h3",{class:"text-subtitle-2 font-weight-bold mt-4 mb-2"}," Ответы ",-1)),i(F,{variant:"accordion",class:"response-panels"},{default:o(()=>[(n(!0),d(b,null,_(a.responses,(c,A)=>(n(),u(V,{key:A},{default:o(()=>[i(v,null,{default:o(()=>[i(g,{color:se(String(A)),size:"small",variant:"flat",label:"",class:"me-3"},{default:o(()=>[s(l(A),1)]),_:2},1032,["color"]),s(" "+l(c.description),1)]),_:2},1024),c.content?(n(),u(J,{key:0},{default:o(()=>[t("div",Qe,[i(x,{class:"copy-btn",size:"x-small",variant:"text",icon:"mdi-content-copy",title:m.value===`${a.path}-${A}`?"Скопировано":"Скопировать",onClick:tt=>f(JSON.stringify(c.content,null,2),`${a.path}-${A}`)},null,8,["title","onClick"]),t("pre",null,l(JSON.stringify(c.content,null,2)),1)])]),_:2},1024)):O("",!0)]),_:2},1024))),128))]),_:2},1024)]),_:2},1024)]),_:2},1032,["id"]))),128))]),_:1}),L(K)?O("",!0):(n(),u(W,{key:0,cols:"3",lg:"3",class:"d-none d-md-block"},{default:o(()=>[t("div",Ze,[e[45]||(e[45]=t("div",{class:"text-subtitle-2 font-weight-bold mb-3"}," На этой странице ",-1)),i(D,{density:"compact",class:"bg-transparent toc-list"},{default:o(()=>[(n(!0),d(b,null,_(T.value,a=>(n(),u(N,{key:a.path,title:a.shortTitle,active:Y.value===a.path,"active-color":"primary",onClick:c=>H(a.path)},{prepend:o(()=>[i(g,{color:S(a.method),size:"x-small",variant:"flat",label:"",class:"me-2 method-chip toc-method"},{default:o(()=>[s(l(a.method),1)]),_:2},1032,["color"])]),_:2},1032,["title","active","onClick"]))),128))]),_:1})])]),_:1}))]),_:1})]),_:1})}}},st=he(Xe,[["__scopeId","data-v-adec5673"]]);export{st as default};
