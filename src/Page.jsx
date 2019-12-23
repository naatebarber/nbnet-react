import React from 'react'

class Page extends React.Component {
    render() {

    }

    scroll(ref) {
        ref.current.scrollIntoView({behavior: 'smooth'})
    }

    getCMS() {
        return new Promise((resolve, reject) => {
            fetch("/cms?pageName=" + this.pageName).then(res => {
                res.json().then(json => {
                    if(!json.error) return resolve(json.entry);
                    return reject("Unsuccessful CMS Get Operation");
                });
            })
        });
    }
}

export default Page;