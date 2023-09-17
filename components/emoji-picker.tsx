import { Smile } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
//WHY: see more anout this emoji imports
import { useTheme } from "next-themes";


interface Props {
    onChange: (value: string) => void;
}

const EmojiPicker = ({
    onChange
}: Props) => {

    const { resolvedTheme } = useTheme(); //WHY: how this is working

    return (
        <Popover>
            {/* WHY: two options for any compo is compping shadcn&radix/ui something */}
            <PopoverTrigger>
                <Smile className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition" />
            </PopoverTrigger>
            <PopoverContent
                side="right"
                sideOffset={40}
                className="bg-transparent border-none shadow-none drop-shadow-none mb-16"
            //   WHY: see about this props
            >
                <Picker
                    data={data}
                    theme={resolvedTheme}
                    onEmojiSelect={(emoji: any) => onChange(emoji.native)}
                //   WHY: emoji.native ma why native
                />
            </PopoverContent>
        </Popover>
    );
}

export default EmojiPicker;