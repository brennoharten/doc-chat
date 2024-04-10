import { db as prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const fileId = searchParams.get("key");

    try {
        const user = await getCurrentUser();
        const userId = user?.id;

        if (!user) {
            return NextResponse.json(
                { error: "Usuário não autenticado." },
                { status: 401 }
            );
        }

        if (!fileId) {
            // Se fileId não estiver presente, retornar os arquivos do usuário
            const userFiles = await prisma.file.findMany({
                where: {
                    userId: userId,
                },
            });

            if (!userFiles || userFiles.length === 0) {
                console.log("Usuário sem arquivos");
                return NextResponse.json(
                    { message: "Usuário não possui arquivos." },
                    { status: 404 }
                );
            }

            return NextResponse.json(userFiles);
        } else {
            // Se fileId estiver presente, buscar e retornar o arquivo correspondente
            const file = await prisma.file.findFirst({
                where: {
                    key: fileId,
                },
            });
            
            if (!file) {
                return NextResponse.json(
                    { error: "Arquivo não encontrado." },
                    { status: 404 }
                    );
                }
            return NextResponse.json(file);
        }
    } catch (error) {
        console.error("Erro ao buscar arquivos do usuário:", error);
        return NextResponse.json(
            { error: "Ocorreu um erro ao buscar os arquivos do usuário." },
            { status: 500 }
        );
    }
}


export async function DELETE(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams;
	const fileId = searchParams.get("file");
	try {
		// Verificar se o usuário está autenticado
		const user = await getCurrentUser();
		const userId = user?.id;
		if (!user) {
			return NextResponse.json(
				{ error: "Usuário não autenticado." },
				{ status: 401 }
			);
		}

		if (!fileId) {
			return NextResponse.json({ error: "Arquivo invalido" }, { status: 400 });
		}

		// Verificar se o arquivo pertence ao usuário autenticado
		const file = await prisma.file.findUnique({
			where: {
				id: fileId,
				userId: user.id,
			},
		});
		if (!file || file.userId !== user.id) {
			return NextResponse.json(
				{ error: "Arquivo não encontrado ou não pertence ao usuário." },
				{ status: 404 }
			);
		}

		// Excluir o arquivo
		await prisma.file.delete({
			where: {
				id: fileId,
			},
		});

		// Retornar resposta de sucesso
		return NextResponse.json(
			{ message: "Arquivo excluído com sucesso." },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Erro ao excluir arquivo:", error);
		return NextResponse.json(
			{ error: "Ocorreu um erro ao excluir o arquivo." },
			{ status: 500 }
		);
	}
}
