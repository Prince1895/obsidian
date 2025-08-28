"use client";

import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import {type ColorResult,CirclePicker,SketchPicker} from "react-color";
import { 
    BoldIcon, 
    ChevronDownIcon, 
    CodeIcon, 
    HighlighterIcon, 
    ImageIcon, 
    ItalicIcon, 
    Link2Icon, 
    ListTodoIcon, 
    LucideIcon, 
    PrinterIcon, 
    Redo2Icon, 
    RemoveFormattingIcon, 
    SpellCheckIcon, 
    UnderlineIcon, 
    Undo2Icon 
} from "lucide-react";
import {type Level} from "@tiptap/extension-heading";
import { 
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


const ImageButton = () => {
    const { editor } = useEditorStore();
    const [isDialogOpen,setIsDialogOpen]=useState(false);
    const [imageUrl,setImageUrl]=useState("");
   
    const onChange=(src:string)=>{
        if (src) {
            editor?.chain().focus().setImage({ src }).run();
        }
        setImageUrl("");
        setIsDialogOpen(false);
    }
    return(
        <DropdownMenu open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DropdownMenuTrigger asChild>
                <button className="h-7 min-w-7 border-1 shrink-0 flex flex-col items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden">
                    <ImageIcon className="size-6 " />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2.5 flex items-center gap-x-2 ">
                <Input
                    placeholder="paste image url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />
                <Button onClick={() => onChange(imageUrl)}>
                    Add
                </Button>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

    
const FontFamilyButton = () => {
    const { editor } = useEditorStore();

    const fonts = [
        { label: "Arial", value: "Arial" },
        { label: "Times New Roman", value: "Times New Roman" },
        { label: "Courier New", value: "Courier New" },
        { label: "Verdana", value: "Verdana" },
        { label: "Georgia", value: "Georgia" },
        { label: "Tahoma", value: "Tahoma" },
        { label: "Trebuchet MS", value: "Trebuchet MS" },
        { label: "Lucida Sans Unicode", value: "Lucida Sans Unicode" },
        { label: "Arial Black", value: "Arial Black" },
        { label: "Comic Sans MS", value: "Comic Sans MS" },
        { label: "Helvetica", value: "Helvetica" },
        { label: "Impact", value: "Impact" },
        { label: "Lucida Sans", value: "Lucida Sans" },
        { label: "Palatino", value: "Palatino" },
        { label: "Times", value: "Times" },
    ];

    const currentFont = editor?.getAttributes("textStyle")?.fontFamily || "Arial";

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-7 w-[140px] border-1 shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden">
                    <span className="truncate">{currentFont}</span>
                    <ChevronDownIcon className="ml-2 size-4 shrink-0" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                {fonts.map(({ label, value }) => (
                    <DropdownMenuItem
                        onClick={() => editor?.chain().focus().setFontFamily(value).run()}
                        key={value}
                        className={cn(
                            "flex items-center gap-x-2 px-2 py-1 border-1 rounded-sm hover:bg-neutral-200/80",
                            currentFont === value && "bg-neutral-200/80"
                        )}
                        style={{ fontFamily: value }}
                    >
                        <span className="text-sm">{label}</span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

const TextColorButton=()=>{
    const {editor} = useEditorStore();
    const value=editor?.getAttributes("textStyle").color||"black";
    const onChange=(color:ColorResult)=>{
        editor?.chain().focus().setColor(color.hex).run();
    }
    return(
       <DropdownMenu>
           <DropdownMenuTrigger asChild>
               <button className="h-7 min-w-7 border-1 shrink-0 flex flex-col items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden">
                 <span className="text-xs">A</span>
                 <div className="h-0.5 w-full mb-2  " style={{ backgroundColor: value}} />
                </button>
           </DropdownMenuTrigger>
           <DropdownMenuContent className="p-2.5 ">
            <SketchPicker
            color={value}
            onChange={onChange}></SketchPicker>
           </DropdownMenuContent>
       </DropdownMenu>
    )


}

const LinkButton = () => {
    const { editor } = useEditorStore();
    const [value,setValue]=useState(editor?.getAttributes("link")?.href||"");
    const onChange=(href:string)=>{
        editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
        setValue("");
    }
    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-7 min-w-7 border-1 shrink-0 flex flex-col items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden">
                    <Link2Icon className="size-6 " />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2.5 flex items-center gap-x-2 ">
                <Input
       placeholder="paste link"
        value={value}
        onChange={(e) => setValue(e.target.value)}
    />
    <Button onClick={() => onChange(value)}>
        Set Link
    </Button>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const HighlightColorButton = () => {
    const { editor } = useEditorStore();
    const highlightColors = [
        { label: "Red", value: "red" },
        { label: "#ffa8a8", value: "#ffa8a8" },
        { label: "Orange", value: "#ffab70" },
        { label: "Green", value: "#8ce99a" },
        { label: "Blue", value: "#74c0fc" },
        { label: "Purple", value: "#b197fc" },
        { label: "Pink", value: "#f680ff" },
        { label: "Yellow", value: "#ffd700" },
    ];
    const currentColor = editor?.getAttributes("highlight")?.color || "red";

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-7 min-w-7 border-1 shrink-0 flex flex-col items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden">
                    
                    <HighlighterIcon className="size-5 " />
                    
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                {highlightColors.map(({ label, value }) => (
                    <DropdownMenuItem
                        onClick={() => editor?.chain().focus().toggleHighlight({ color: value }).run()}
                        key={value}
                        className={cn(
                            "flex items-center gap-x-2 px-2 py-1 border-1 rounded-sm hover:bg-neutral-200/80",
                            currentColor === value && "bg-neutral-200/80"
                        )}
                        style={{ backgroundColor: value }}
                    >
                        <span className="text-sm">{label}</span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};


const HeadingLevelButton = () => {
    const { editor } = useEditorStore();

    const headings = [
        { label: "Normal text", value: 0, fontSize: "16px" },
        { label: "Heading 1", value: 1, fontSize: "32px" },
        { label: "Heading 2", value: 2, fontSize: "28px" },
        { label: "Heading 3", value: 3, fontSize: "24px" },
        { label: "Heading 4", value: 4, fontSize: "20px" },
        { label: "Heading 5", value: 5, fontSize: "16px" },
        { label: "Heading 6", value: 6, fontSize: "12px" },
    ];

    const getCurrentHeading = () => {
        for (let level = 1; level <= 6; level++) {
            if (editor?.isActive("heading", { level })) {
                return `Heading ${level}`;
            }
        }
        return "Normal text";
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-7 min-w-7 border-1 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden">
                    <span className="truncate">{getCurrentHeading()}</span>
                    <ChevronDownIcon className="ml-2 size-4 shrink-0" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                {headings.map(({ label, value, fontSize }) => (
                    <button
                        key={value}
                        onClick={()=>{
                            if(value===0){
                                editor?.chain().focus().setParagraph().run();
                            }else{
                                editor?.chain().focus().toggleHeading({ level: value as Level }).run();
                            }
                        }}
                        className={cn(
                            "flex items-center gap-x-2 px-2 py-1  rounded-sm hover:bg-neutral-200/80",
                            (value === 0 && editor?.isActive("heading")) ||
                            editor?.isActive("heading", { level: value })
                                ? "bg-neutral-200/80"
                                : ""
                        )}
                        style={{ fontSize }}
                    >
                        <span className="text-sm">{label}</span>
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

interface ToolbarButtonProps {
    onClick?: () => void;
    isActive?: boolean;
    icon: LucideIcon;
}

export const ToolbarButton = ({
    onClick,
    isActive,
    icon: Icon
}: ToolbarButtonProps) => (
    <button
        onClick={onClick}
        className={cn(
            "text-sm px-1 h-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
            isActive && "bg-neutral-200/80"
        )}
    >
        <Icon className="size-4" />
    </button>
);

interface ToolbarItem {
    label: string;
    icon: LucideIcon;
    onClick?: () => void;
    isActive?: boolean;
}

const Toolbar = () => {
    const { editor } = useEditorStore();

    const sections: ToolbarItem[][] = [
        [
            {
                label: "Undo",
                icon: Undo2Icon,
                onClick: () => editor?.chain().focus().undo().run(),
            },
            {
                label: "Redo",
                icon: Redo2Icon,
                onClick: () => editor?.chain().focus().redo().run(),
            },
            {
                label: "Print",
                icon: PrinterIcon,
                onClick: () => window.print(),
            },
            {
                label: "spell check",
                icon: SpellCheckIcon,
                onClick() {
                    const current = editor?.view.dom.getAttribute("spellcheck");
                    editor?.view.dom.setAttribute("spellcheck", current === "false" ? "true" : "false");
                }
            },
        ],
        [
            {
                label: "Bold",
                icon: BoldIcon,
                onClick: () => editor?.chain().focus().toggleBold().run(),
                isActive: editor?.isActive("bold"),
            },
            {
                label: "Italic",
                icon: ItalicIcon,
                onClick: () => editor?.chain().focus().toggleItalic().run(),
                isActive: editor?.isActive("italic"),
            },
            {
                label: "Underline",
                icon: UnderlineIcon,
                onClick: () => editor?.chain().focus().toggleUnderline().run(),
                isActive: editor?.isActive("underline"),
            },
           
            {
                label: "code",
                icon: CodeIcon,
                onClick: () => editor?.chain().focus().toggleCode().run(),
                isActive: editor?.isActive("code"),
            },
            {
                label: "List Todo",
                icon: ListTodoIcon,
                onClick: () => editor?.chain().focus().toggleTaskList().run(),
                isActive: editor?.isActive("taskList"),
            },
            {
                label: "Remove Format",
                icon: RemoveFormattingIcon,
                onClick: () => editor?.chain().focus().unsetAllMarks().run(),
            },
        ],
    ];

    return (
        <div className="bg-[#F1F4F9] px-3 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-1 overflow-x-auto mx-4 my-2 border border-slate-200 shadow-sm transition-all duration-200">
            {sections[0].map((item) => (
                <ToolbarButton
                    key={item.label}
                    onClick={item.onClick}
                    isActive={item.isActive}
                    icon={item.icon}
                />
            ))}
            <div className="pb-1">|</div>
            <FontFamilyButton />
            <div className="pb-1">|</div>
            <HeadingLevelButton />
            <div className="pb-1">|</div>
            {sections[1].map((item) => (
                <ToolbarButton
                    key={item.label}
                    onClick={item.onClick}
                    isActive={item.isActive}
                    icon={item.icon}
                />
            ))}
            <TextColorButton/>
            <HighlightColorButton />
             <div className="pb-1">|</div>
             <LinkButton/>
             <ImageButton/>
        </div>
        
    );
};

export default Toolbar;