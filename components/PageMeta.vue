

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const urlData = router.currentRoute.value;
var pageTitle;

//News category
if (urlData.params.category) {
    let cat = urlData.params.category;
    console.log('category');
    console.log(cat);

    switch(cat) {	
        case 'economic':				
            pageTitle = 'Economy title';
            break;				
        case "politics":
            pageTitle = 'Politics title';
            break;	
        case "nikkei":
            pageTitle = 'Nikkei title';
            break;
        case "covid-19":
            pageTitle = 'Nikkei title';
            break;
        case "others":
            pageTitle = 'Nikkei title';
            break;
    }
};

    useHead({
        title: pageTitle ? pageTitle : '',
        meta: [
            {
                hid: 'og:title',
                property: 'og:title',
                content: 'hahahahahhahah'
            },
        ]
    });

</script>