async function submitRequest(event) {
  event.preventDefault();
  const output = document.getElementById("output");

  let step = 0;
  output.value = `Loading`;

  const interval = setInterval(() => {
    step++;

    if (step > 3) {
      step = 0;
      output.value = `Loading`;
    }

    output.value += '.';
  }, 250);

  try {
    const unixTimestamp = new Date(event.target[0].value).getTime();
    const entityId = event.target[1].value;
    const tenantIds = [`${entityId}@public.attributes`, `${entityId}@public.entities`];
  
    const result = {};
  
    for (let tenantId of tenantIds) {
      const response = await fetch(`/getHash/${tenantId}/${unixTimestamp}`);
      const body = await response.json();
  
      if (tenantIds.indexOf(tenantId) === 0) {
        result["dateTime"] = new Date(Number(body.result.unixTimestamp)).toISOString();
      }
  
      result[tenantId] = body.result.storedHash;
    }

    clearInterval(interval);
    output.value = JSON.stringify(result, undefined, 4);
  } catch (e) {
    clearInterval(interval);
    output.value = JSON.stringify(e, undefined, 4);
  }
}

function copyOutputToClipboard() {
  const output = document.getElementById("output");

  if (!output.value)
    return;

  try {
    JSON.parse(output.value)
  } catch {
    return;
  }

  navigator.clipboard.writeText(output.value);
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById("form");
  form.addEventListener("submit", submitRequest);

  const copyButton = document.getElementById("copy");
  copyButton.addEventListener("click", copyOutputToClipboard);
}, false);