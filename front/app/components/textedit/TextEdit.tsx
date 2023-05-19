import { FC } from 'react';
import { EditorComposer, Editor, ToolbarPlugin, AlignDropdown, InsertDropdown } from 'verbum';

export const NoteViewer: FC = () => {
    return (
        <>
            <EditorComposer>
                <Editor hashtagsEnables={true}>
                    <ToolbarPlugin defaultFontSize="20px">
                        <InsertDropdown enablePool={true} />
                        <AlignDropdown />
                    </ToolbarPlugin>
                </Editor>
            </EditorComposer>
        </>
    );
};

export default NoteViewer;