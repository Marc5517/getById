import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index"

interface ICoronaTest {
    testId: number
    machineName: string
    temperature: number
    location: string
    date: string
    time: string
}

let baseUrl: string = "https://coronatest.azurewebsites.net/api/CoronaTests"

new Vue({
    // TypeScript compiler complains about Vue because the CDN link to Vue is in the html file.
    // Before the application runs this TypeScript file will be compiled into bundle.js
    // which is included at the bottom of the html file.
    el: "#app",
    data: {
        tests: [],
        idToGetBy: 1,
        singleTest: null
    },
    methods: {
        getAllTests() {
            this.helperGetAndShow(baseUrl, "all")
        },
        helperGetAndShow(url: string) {
            axios.get<ICoronaTest[]>(url)
                .then((response: AxiosResponse<ICoronaTest[]>) => {
                        this.tests = response.data
                })
                .catch((error: AxiosError) => {
                    //this.message = error.message
                    alert(error.message) // https://www.w3schools.com/js/js_popup.asp
                })
        },
        getById(id: number) {
            let url: string = baseUrl + "/" + id
            axios.get<ICoronaTest>(url)
                .then((response: AxiosResponse<ICoronaTest>) => {
                    this.singleTest = response.data
                })
                .catch((error: AxiosError) => {
                    //this.message = error.message
                    alert(error.message) // https://www.w3schools.com/js/js_popup.asp
                })
        }
    }
})
