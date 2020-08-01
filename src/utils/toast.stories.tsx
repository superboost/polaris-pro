import { Button, Checkbox, FormLayout, TextField } from "@shopify/polaris";
import React, { ReactElement, useCallback, useState } from "react";

import { toast } from "./toast";

export default {
  title: "消息弹窗",
};

export const Message = (): ReactElement => {
  const [error, setError] = useState(false);
  const [duration, setDuration] = useState("10000");

  const triggerToast = useCallback(() => {
    toast({ error, duration: Number(duration), content: "这是一条消息" });
  }, [error, duration]);

  return (
    <FormLayout>
      <Checkbox label="错误消息" checked={error} onChange={setError} />

      <TextField
        label="持续时间"
        type="number"
        value={duration}
        onChange={setDuration}
      />

      <Button onClick={triggerToast}>触发</Button>
    </FormLayout>
  );
};

Message.story = { name: "消息弹窗" };
