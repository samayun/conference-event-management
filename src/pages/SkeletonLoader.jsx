import './loader.css';

function Card() {
    return (
        <div class="card m-2">
            <div class="card-1 animate-pulse"> </div>
            <div class="card-2 p-3">
                <div class="row">
                    <div class="col-4">
                        <div class="inner-card animate-pulse"> </div>
                    </div>
                    <div class="col-8">
                        <div class="inner-card animate-pulse"> </div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-6">
                        <div class="inner-card animate-pulse"> </div>
                    </div>
                    <div class="col-6">
                        <div class="inner-card animate-pulse"> </div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-2">
                        <div class="inner-card animate-pulse"> </div>
                    </div>
                    <div class="col-10">
                        <div class="inner-card animate-pulse"> </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default function SkeletonLoader() {
    // align - items - center
    return (
        <div class="container h-screen d-flex justify-content-center  mr-2">
            <div className="row">
                <div className="col-md-4"><Card /></div>
                <div className="col-md-4 d-none d-sm-block"><Card /></div>
                <div className="col-md-4 d-none d-sm-block"><Card /></div>
            </div>
        </div>
    )
}