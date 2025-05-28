using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mock.Migrations
{
    /// <inheritdoc />
    public partial class init10 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "Child");

            migrationBuilder.DropColumn(
                name: "FatherName",
                table: "Child");

            migrationBuilder.DropColumn(
                name: "FatherPhone",
                table: "Child");

            migrationBuilder.DropColumn(
                name: "MotherName",
                table: "Child");

            migrationBuilder.DropColumn(
                name: "MotherPhone",
                table: "Child");

            migrationBuilder.DropColumn(
                name: "Password",
                table: "Child");

            migrationBuilder.AddColumn<string>(
                name: "ChaperoneId",
                table: "Child",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDisable",
                table: "Child",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsPrivateCar",
                table: "Child",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsPrivateChperone",
                table: "Child",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "ParentsId",
                table: "Child",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Parents",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FatherName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MotherName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FatherPhone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MotherPhone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Parents", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Child_ChaperoneId",
                table: "Child",
                column: "ChaperoneId");

            migrationBuilder.CreateIndex(
                name: "IX_Child_ParentsId",
                table: "Child",
                column: "ParentsId");

            migrationBuilder.AddForeignKey(
                name: "FK_Child_Chaperone_ChaperoneId",
                table: "Child",
                column: "ChaperoneId",
                principalTable: "Chaperone",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Child_Parents_ParentsId",
                table: "Child",
                column: "ParentsId",
                principalTable: "Parents",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Child_Chaperone_ChaperoneId",
                table: "Child");

            migrationBuilder.DropForeignKey(
                name: "FK_Child_Parents_ParentsId",
                table: "Child");

            migrationBuilder.DropTable(
                name: "Parents");

            migrationBuilder.DropIndex(
                name: "IX_Child_ChaperoneId",
                table: "Child");

            migrationBuilder.DropIndex(
                name: "IX_Child_ParentsId",
                table: "Child");

            migrationBuilder.DropColumn(
                name: "ChaperoneId",
                table: "Child");

            migrationBuilder.DropColumn(
                name: "IsDisable",
                table: "Child");

            migrationBuilder.DropColumn(
                name: "IsPrivateCar",
                table: "Child");

            migrationBuilder.DropColumn(
                name: "IsPrivateChperone",
                table: "Child");

            migrationBuilder.DropColumn(
                name: "ParentsId",
                table: "Child");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Child",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "FatherName",
                table: "Child",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "FatherPhone",
                table: "Child",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "MotherName",
                table: "Child",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "MotherPhone",
                table: "Child",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "Child",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
