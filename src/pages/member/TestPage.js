import TestComponent from "../../components/member/TestComponent";
import BasicLayout from "../../layouts/BasicLayout";

const TestPage = () => {
    return (
        <BasicLayout>
            Member Test Page...
            <TestComponent></TestComponent>
        </BasicLayout>
    );
}

export default TestPage;