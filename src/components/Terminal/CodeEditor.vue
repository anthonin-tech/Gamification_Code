<script lang="ts" setup>
    import { ref, onMounted } from 'vue'
    import { basicSetup, EditorView } from "codemirror"
    import { Compartment, Prec } from '@codemirror/state'
    import { keymap } from '@codemirror/view'
    import { indentWithTab } from '@codemirror/commands'
    import { StreamLanguage } from '@codemirror/language'
    import { javascript } from '@codemirror/lang-javascript'
    import { python } from '@codemirror/lang-python'
    import { java } from '@codemirror/lang-java'
    import { cpp } from '@codemirror/lang-cpp'
    import { rust } from '@codemirror/lang-rust'
    import { php } from '@codemirror/lang-php'
    import { go } from '@codemirror/legacy-modes/mode/go'
    import { csharp } from '@codemirror/legacy-modes/mode/clike'
    import { useUserStore } from '@/stores/useUserStore'
    import { editorThemes, themeCodeQuest, highlightCodeQuest } from '@/assets/editor-themes'

    const editeur = ref<HTMLElement | null> (null)
    const props = defineProps<{ langage: string }>()
    const UserStore = useUserStore()
    const themeCompartment = new Compartment()
    const emit = defineEmits(['submit'])
    let view: EditorView | null = null

    const themeActif = editorThemes[UserStore.editorTheme] ?? themeCodeQuest

    const LangageEditor: Record<string, any> = {
        javascript: javascript(),
        python: python(),
        cpp: cpp(),
        rust: rust(),
        php: php(),
        java: java(),
        typescript: javascript({ typescript: true}),
        go: StreamLanguage.define(go),
        csharp: StreamLanguage.define(csharp)
    }

    onMounted(() => {
        view = new EditorView({
            doc: "//écris ton code ici",
            extensions: [
                basicSetup,
                themeCompartment.of(themeActif),
                highlightCodeQuest,
                LangageEditor[props.langage],
                keymap.of([indentWithTab]),
                Prec.highest(keymap.of([{ key: 'Ctrl-Enter', run: () => { emit('submit', view?.state.doc.toString()); return true } }])),
            ],
            parent: editeur.value ?? undefined,
        })
    })

    function ChoiceTheme(nameTheme: string) {
        UserStore.updateEditorTheme(nameTheme)
        view?.dispatch({ effects: themeCompartment.reconfigure(editorThemes[UserStore.editorTheme] ?? themeCodeQuest) })
    }
</script>

<template>
    <div class="code-editor-wrapper">
        <div class="code-editor-toolbar">
            <select class="theme-select" :value="UserStore.editorTheme" @change="ChoiceTheme(($event.target as HTMLSelectElement).value)">
                <option value="codequest">CodeQuest</option>
                <option value="dark">Dark</option>
                <option value="light">Light</option>
                <option value="ocean">Océan</option>
                <option value="matrix">Matrix</option>
                <option value="sunset">Sunset</option>
            </select>
        </div>
        <div ref="editeur" class="code-editor-mount" />
    </div>
</template>

<style scoped>
.code-editor-wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.code-editor-toolbar {
    display: flex;
    justify-content: flex-end;
}

.theme-select {
    padding: 7px 30px 7px 12px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.04);
    color: rgba(255, 255, 255, 0.75);
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    outline: none;
    appearance: none;
    -webkit-appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 10px center;
    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
}

.theme-select:hover {
    border-color: rgba(124, 58, 237, 0.4);
    background-color: rgba(255, 255, 255, 0.07);
}

.theme-select:focus {
    border-color: rgba(124, 58, 237, 0.6);
    box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.15);
}

.theme-select option {
    background: #0f1120;
    color: #fff;
}

.code-editor-mount {
    min-height: 200px;
}

.code-editor-mount :deep(.cm-editor) {
    height: 100%;
}

.code-editor-mount :deep(.cm-scroller) {
    overflow: auto;
}
</style>
