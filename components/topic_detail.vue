<template>
    <section>
        <p>Testing default component content</p>
        Testing prop: <br>
        {{testing}}<br>
        <br>
        Text before convert / test prop: <br>
        {{test}}<br>
        <br>
        Text after convert: <br>
        {{convertContent}}<br>
        <br>
        Text after convert 2: <br>
        {{convertContent2}}<br>
        <br>
        Normal Data: <br>
        {{normalData}}
    </section>
</template>

<script>
export default {
    data() {
        return {
            convertContent: '',
            convertContent2: this.test,
            normalData: 'Normal data',
        };
    },
    props: {
        testing: {
            type: String,
            required: false,
            default: null
        },
        test: {
            type: String,
            required: false,
            default: null
        },
    },
    async asyncData({ params }) {
        const convertContent = this.test.toUpperCase();
        var convertContent2 = this.test + '1111111';
        return {
            params,
            convertContent,
            convertContent2
        };
    }
};
</script>
