import { useThemeStore } from "@/store/useThemeStore";
import { THEMES } from "@/constants";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Preview_Messages {
  id: number;
  content: string;
  isSent: boolean;
}

const PREVIEW_MESSAGES: Preview_Messages[] = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  {
    id: 2,
    content: "I'm doing great! Just working on some new features.",
    isSent: true,
  },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="container mx-auto h-screen max-w-5xl px-4 pt-20">
      <div className="space-y-8">
        {/* Theme Section */}
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">Theme</h2>
          <p className="text-base-content/70 text-sm">
            Choose a theme for your chat interface
          </p>
        </div>

        {/* Theme Selector Grid */}
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-8">
          {THEMES.map((t) => {
            const isSelected = theme === t;
            return (
              <div
                key={t}
                className={`flex cursor-pointer flex-col items-center gap-1.5 rounded-lg border p-2 transition-all duration-200 ${isSelected ? "border-primary bg-primary/10" : "border-base-300 hover:bg-base-200/50"}`}
                onClick={() => setTheme(t)}
              >
                {/* Color preview squares */}
                <div className="flex w-full justify-between overflow-hidden rounded-md">
                  <div className="bg-primary h-6 flex-1"></div>
                  <div className="bg-secondary h-6 flex-1"></div>
                  <div className="bg-accent h-6 flex-1"></div>
                  <div className="bg-neutral h-6 flex-1"></div>
                </div>
                {/* Theme label */}
                <span className="w-full truncate text-center text-[11px] font-medium">
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </span>
              </div>
            );
          })}
        </div>

        {/* Preview Section */}
        <h3 className="mb-3 text-lg font-semibold">Preview</h3>
        <div className="border-base-300 bg-base-100 overflow-hidden rounded-xl border shadow-lg">
          <div className="bg-base-200 p-4">
            <div className="mx-auto max-w-lg">
              <div className="bg-base-100 overflow-hidden rounded-xl shadow-sm">
                {/* Chat Header */}
                <div className="border-base-300 bg-base-100 border-b px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary text-primary-content flex h-8 w-8 items-center justify-center rounded-full font-medium">
                      J
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">John Doe</h3>
                      <p className="text-base-content/70 text-xs">Online</p>
                    </div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="bg-base-100 max-h-[200px] min-h-[200px] space-y-4 overflow-y-auto p-4">
                  {PREVIEW_MESSAGES.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-xl p-3 shadow-sm ${
                          message.isSent
                            ? "bg-primary text-primary-content"
                            : "bg-base-200"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p
                          className={`mt-1.5 text-[10px] ${
                            message.isSent
                              ? "text-primary-content/70"
                              : "text-base-content/70"
                          }`}
                        >
                          12:00 PM
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="border-base-300 bg-base-100 border-t p-4">
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Type a message..."
                      value="This is a preview"
                      readOnly
                      className="h-10 flex-1 text-sm"
                    />
                    <Button className="h-10 p-2">
                      <Send size={18} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
