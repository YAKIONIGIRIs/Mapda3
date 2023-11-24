"use client";
import { title } from "@/components/primitives";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

export default function HomePage() {
  return (
    <>
      <div className="flex items-center justify-center mb-8 pt-8">
        <h1 className={title({ size: "sm" })}>貢献👣</h1>
      </div>
      <div className="flex gap-10 mt-28">
        <Card className="py-4 w-1/4">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <h4 className="font-bold text-large">マップの閲覧数</h4>
            <small className="text-default-500">
              ホーム画面で、マップがクリックされた数
            </small>
          </CardHeader>
          <CardBody className="overflow-visible py-10 flex items-center">
            <p className="text-6xl font-semibold text-sky-800">11,520</p>
            <p>回</p>
          </CardBody>
        </Card>
        <Card className="py-4 w-1/4">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <h4 className="font-bold text-large">マップのClaim数</h4>
            <small className="text-default-500">
              マップがClaim（購入）された数
            </small>
          </CardHeader>
          <CardBody className="overflow-visible py-10 flex items-center">
            <p className="text-6xl font-semibold text-sky-800">852</p>
            <p>回</p>
          </CardBody>
        </Card>
        <Card className="py-4 w-1/4">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <h4 className="font-bold text-large">他車への貢献</h4>
            <small className="text-default-500">
              他車と協調してストリートビュー作成に貢献した数
            </small>
          </CardHeader>
          <CardBody className="overflow-visible py-10 flex items-center">
            <p className="text-6xl font-semibold text-sky-800">238,472</p>
            <p>回</p>
          </CardBody>
        </Card>
        <Card className="py-4 w-1/4">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <h4 className="font-bold text-large">Mapda3上の収益</h4>
            <small className="text-default-500">
              Claim数と他車への貢献による収益
            </small>
          </CardHeader>
          <CardBody className="overflow-visible py-10 flex items-center">
            <p className="text-6xl font-semibold text-sky-800">75.326 </p>
            <p>MATIC</p>
            <p className="text-lg pt-2">5,802円</p>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
