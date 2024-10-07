import i18n from "@/translations";

export const actionCaring: { label: string; value: string; key: string }[] = [
  {
    label: ("call-caring"),
    value: "call",
    key: "1",
  },
  {
    label: ("message-caring"),
    value: "message",
    key: "2",
  },
  {
    label: ("go_meet-caring"),
    value: "go_meet",
    key: "3",
  },
  {
    label: ("online_meeting-caring"),
    value: "online_meeting",
    key: "4",
  },
  {
    label: ("other-caring"),
    value: "other",
    key: "5",
  },
];

export const statusCaring = [
    {
    label: ("ready-caring"),
    value: "call",
    key: "1",
  },
  {
    label: ("none-ready-caring"),
    value: "message",
    key: "2",
  },
]