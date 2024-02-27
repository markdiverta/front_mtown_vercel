<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const urlData = router.currentRoute.value;
var pageTitle, pageDesc;

const props = defineProps(['apiContent']);
const contentProps = ref(props.apiContent);
const metaInfo = contentProps.value;

if (metaInfo) {
    if (metaInfo.ext_col_02) { //Meta Title
        pageTitle = metaInfo.ext_col_02;
    };
    if (metaInfo.ext_col_03) { //Meta Description
        pageDesc = metaInfo.ext_col_03;
    };
};

//News category
// if (urlData.params.category) {
//     let cat = urlData.params.category;

//     switch(cat) {	
//         case 'economic':				
//             pageTitle = 'Economy title';
//             break;				
//         case "politics":
//             pageTitle = 'Politics title';
//             break;	
//         case "nikkei":
//             pageTitle = 'Nikkei title';
//             break;
//         case "covid-19":
//             pageTitle = 'Nikkei title';
//             break;
//         case "others":
//             pageTitle = 'Nikkei title';
//             break;
//     }
// };

useHead({
    title: pageTitle,
    meta: [
        {
            hid: 'og:title',
            property: 'og:title',
            content: pageTitle
        },
        {
            hid: 'og:description',
            property: 'og:description',
            content: pageDesc
        },
        {
            hid: 'description',
            name: 'description',
            content: pageDesc
        }
    ]
});

</script>