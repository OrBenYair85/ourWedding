

export function BlessPreview () {

    const bless = {
        _id: "1ABC",
        header: "Hello Bless",
        blessData: "I want to bless you",
        owner: "Or Ben Yair",
        createdAt: 1231231241,
        updatedAt: 1231231241
    }

    return (
        <>  <section>
                <div className="bless-header">
                    <h1>{bless.header}</h1>
                </div>
                <div>
                    <p>{bless.blessData}</p>
                    <h3>{bless.owner}</h3>
                </div>
            </section>
        </>
    )

}