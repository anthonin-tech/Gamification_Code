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

    function submitCode() {
        emit('submit', view?.state.doc.toString())
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
            <button class="run-btn" @click="submitCode()">
                ▶ Exécuter <kbd>Ctrl+Enter</kbd>
            </button>
        </div>
        <div ref="editeur" class="code-editor-mount" />
    </div>
</template>

<style scoped src="./CodeEditor.css"></style>
