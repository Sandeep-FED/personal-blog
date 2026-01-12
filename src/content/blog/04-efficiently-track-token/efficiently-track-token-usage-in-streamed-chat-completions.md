---
title: "Efficiently Track Token Usage in Streamed Chat Completions"
description: "Learn how to efficiently track token usage in streamed chat completions using OpenAI's API, optimizing costs and enhancing application performance."
date: 2024-11-07
image: "../../../assets/efficiently-track-token-usage.png"
slug: efficiently-track-token-usage-in-streamed-chat-completions
tags: ["openai", "genai", "Azure", "Programming Blogs"]
updatedDate: 2024-11-12
---

Tracking token usage can help you optimize API costs and make your application more efficient. Here’s a quick guide to retrieving token usage data from streamed responses using `stream_options={"include_usage": True}`.

### 🔍 Why Token Usage Matters

Each API request consumes tokens (units of text), and the number of tokens used impacts your API costs. By tracking token usage in real-time, you can stay within budget and optimize your requests.

### 🛠 Step 1: Set Up the Chat Completions Request with Stream Options

To enable token usage tracking in streamed responses, configure your request with both `stream=True` and `stream_options={"include_usage": True}`. Here’s how:

```
response = client.chat_completions.create(
    model='gpt-4o-mini',
    messages=[{'role': 'user', 'content': "What's 1+1? Answer in one word."}],
    temperature=0,
    stream=True,
    stream_options={"include_usage": True}  # Enable token tracking for streaming
)
```

With `stream=True`, the response arrives in chunks. The `include_usage=True` setting adds token usage stats to the final chunk of the response.

### 🔄 Step 2: Process the Streamed Response to Access Token Usage

Once you set up the request, handle each chunk to access token usage data at the end. Here’s what each chunk will contain:

```
for chunk in response:
    print(f"choices: {chunk.choices}\nusage: {chunk.usage}")
    print("****************")
```

- **Intermediate Chunks**: Show partial response content in the `choices` field, while `usage` is `None`.
- **Final Chunk**: Displays `usage` stats like `completion_tokens`, `prompt_tokens`, and `total_tokens`, with an empty `choices` field.

### 🧩 Example Output

```
choices: [Choice(delta=ChoiceDelta(content='', role='assistant'), finish_reason=None)]
usage: None
****************
choices: [Choice(delta=ChoiceDelta(content='Two'), finish_reason=None)]
usage: None
****************
choices: []
usage: CompletionUsage(completion_tokens=2, prompt_tokens=18, total_tokens=20)
****************
```

In this example:

- **Intermediate Chunks** contain parts of the response with `usage` as `None`.
- **Final Chunk** provides token stats for the full request.

### 💡 Key Points to Remember

- **Token Usage in Final Chunk**: Only the last chunk includes `usage` data.
- **Empty** `choices` in Final Chunk: The `choices` field is empty in the last chunk to signify the end of the response.
- **Optimize Costs**: Monitoring token usage allows you to track API costs and fine-tune requests for efficiency.

🔗

For more details on handling streamed responses, check out the [OpenAI Cookbook example on streaming completions](https://cookbook.openai.com/examples/how_to_stream_completions).

### 🎉 Wrapping Up

Using `stream_options={"include_usage": True}` gives you real-time token usage insights, helping you manage costs and improve performance. This option is a powerful way to keep your application efficient and within budget.
